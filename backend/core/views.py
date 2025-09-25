from rest_framework import permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

from django.utils import timezone
from django.db import transaction
from .models import UserProfile, Exam, Question, Choice, Attempt, Answer
from .serializers import (
    UserSerializer,
    RegisterSerializer,
    ExamSerializer,
    ExamDetailSerializer,
    AttemptSerializer,
    AnswerSerializer,
)
from .permissions import ReadOnlyOrInstructorAdmin, IsInstructorOrAdmin, IsAdmin
from rest_framework import viewsets, decorators
from django.http import HttpResponse
import csv


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def health(request):
    return Response({
        'status': 'ok'
    })


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    username = serializer.validated_data.get('username')
    password = serializer.validated_data.get('password')
    email = serializer.validated_data.get('email', '')
    role = serializer.validated_data.get('role', UserProfile.Roles.STUDENT)

    if User.objects.filter(username=username).exists():
        return Response({'detail': 'username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        validate_password(password)
    except ValidationError as e:
        return Response({'detail': e.messages}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password, email=email)
    UserProfile.objects.create(user=user, role=role)
    return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me(request):
    return Response(UserSerializer(request.user).data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    # Blacklist refresh token if provided
    refresh_token = request.data.get('refresh')
    if refresh_token:
        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
        except Exception:
            pass
    return Response({'detail': 'logged out'})


class ExamViewSet(viewsets.ModelViewSet):
    queryset = Exam.objects.all().order_by('-id')
    permission_classes = [ReadOnlyOrInstructorAdmin]

    def get_serializer_class(self):
        if self.action in ['retrieve', 'start']:
            return ExamDetailSerializer
        return ExamSerializer

    @decorators.action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def start(self, request, pk=None):
        exam = self.get_object()
        attempt, _ = Attempt.objects.get_or_create(user=request.user, exam=exam, completed_at=None)
        return Response(AttemptSerializer(attempt).data)

    @decorators.action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def autosave(self, request, pk=None):
        exam = self.get_object()
        attempt, _ = Attempt.objects.get_or_create(user=request.user, exam=exam, completed_at=None)
        payload = request.data or {}
        # payload: { answers: [{ question, selected_choice?, text_response? }] }
        answers = payload.get('answers', [])
        with transaction.atomic():
            for a in answers:
                q_id = a.get('question')
                if not q_id:
                    continue
                try:
                    question = exam.questions.get(id=q_id)
                except Question.DoesNotExist:
                    continue
                selected_choice = None
                if a.get('selected_choice'):
                    try:
                        selected_choice = question.choices.get(id=a['selected_choice'])
                    except Choice.DoesNotExist:
                        selected_choice = None
                obj, _ = Answer.objects.get_or_create(attempt=attempt, question=question)
                obj.selected_choice = selected_choice
                obj.text_response = a.get('text_response', '')
                obj.save()
        return Response(AttemptSerializer(attempt).data)

    @decorators.action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def submit(self, request, pk=None):
        exam = self.get_object()
        try:
            attempt = Attempt.objects.get(user=request.user, exam=exam, completed_at=None)
        except Attempt.DoesNotExist:
            return Response({'detail': 'No active attempt'}, status=400)
        # simple scoring: count correct selected choices
        correct = 0
        total = exam.questions.count()
        for ans in attempt.answers.select_related('question', 'selected_choice'):
            if ans.selected_choice and ans.selected_choice.is_correct:
                correct += 1
        score = (correct / total * 100.0) if total else 0.0
        # also keep legacy Submission for now
        Submission = exam.submissions.model  # from FK
        Submission.objects.create(user_id=request.user.id, exam=exam, score=score)
        attempt.completed_at = timezone.now()
        attempt.save(update_fields=['completed_at'])
        return Response({'score': score, 'correct': correct, 'total': total})

    @decorators.action(detail=True, methods=['get'], permission_classes=[IsAdmin])
    def export(self, request, pk=None):
        exam = self.get_object()
        # Export legacy submissions for now
        submissions = exam.submissions.select_related('exam').all()
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = f'attachment; filename="exam_{exam.id}_results.csv"'
        writer = csv.writer(response)
        writer.writerow(['submission_id', 'user_id', 'exam_id', 'score', 'created_at'])
        for s in submissions:
            writer.writerow([s.id, s.user_id, s.exam_id, s.score, s.created_at.isoformat()])
        return response
