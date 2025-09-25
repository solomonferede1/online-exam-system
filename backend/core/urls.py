"""Core app URL routing: health, auth, JWT, and exam viewset."""

from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views
from rest_framework.routers import DefaultRouter

urlpatterns = [
    path('health/', views.health, name='health'),
    path('auth/register/', views.register, name='register'),
    path('auth/me/', views.me, name='me'),
    path('auth/logout/', views.logout, name='logout'),
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

router = DefaultRouter()
router.register(r'exams', views.ExamViewSet, basename='exam')
router.register(r'users', views.UserViewSet, basename='user')
router.register(r'questions', views.QuestionViewSet, basename='question')
router.register(r'choices', views.ChoiceViewSet, basename='choice')

urlpatterns += router.urls


