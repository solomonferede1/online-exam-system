from rest_framework import permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

from .models import UserProfile
from .serializers import UserSerializer, RegisterSerializer


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
