"""DRF serializers for core models and auth payloads."""

from django.contrib.auth.models import User
from rest_framework import serializers

from .models import UserProfile, Exam, Question, Choice, Attempt, Answer


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['role']


class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'profile']


class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(required=False, allow_blank=True)
    role = serializers.ChoiceField(choices=UserProfile.Roles.choices, required=False)


class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ['id', 'text', 'is_correct']


class QuestionSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'text', 'choices']


class ExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = ['id', 'title', 'description', 'duration_minutes']


class ExamDetailSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Exam
        fields = ['id', 'title', 'description', 'duration_minutes', 'questions']


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'question', 'selected_choice', 'text_response']


class AttemptSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True, read_only=True)
    exam = ExamSerializer(read_only=True)

    class Meta:
        model = Attempt
        fields = ['id', 'exam', 'started_at', 'completed_at', 'answers']


