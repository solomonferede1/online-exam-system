from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views

urlpatterns = [
    path('health/', views.health, name='health'),
    path('auth/register/', views.register, name='register'),
    path('auth/me/', views.me, name='me'),
    path('auth/logout/', views.logout, name='logout'),
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]


