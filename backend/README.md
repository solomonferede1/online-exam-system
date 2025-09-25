# Backend (Django + DRF)

Purpose: REST API for the Online Exam System with JWT auth, RBAC, exams, attempts, autosave, and exports.

## Setup

1. python3 -m venv backend-venv && source backend-venv/bin/activate
2. pip install -r requirements.txt
3. Copy .env.example to .env and fill values
4. python manage.py migrate
5. python manage.py runserver 0.0.0.0:8000

## Apps
- `core`: models (Exam, Question, Choice, Attempt, Answer, UserProfile), views, serializers, URLs

## Auth
- Register: POST /api/v1/auth/register/
- Token: POST /api/v1/auth/token/
- Refresh: POST /api/v1/auth/token/refresh/
- Me: GET /api/v1/auth/me/
- Logout: POST /api/v1/auth/logout/

## Exams
- List/Detail: /api/v1/exams/
- Actions: `start`, `autosave`, `submit`, `export`

## Testing
- python manage.py test core
