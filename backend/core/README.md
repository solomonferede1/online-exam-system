# Core App

Purpose: Exam domain models and API endpoints.

## Models
- `Exam`, `Question`, `Choice` — exam content
- `UserProfile` — user roles (ADMIN, INSTRUCTOR, STUDENT)
- `Attempt`, `Answer` — taking exams with autosave
- `Submission` — legacy score records

## Endpoints
- `GET /api/v1/health/`
- `POST /api/v1/auth/register/`, `GET /api/v1/auth/me/`, `POST /api/v1/auth/logout/`
- `POST /api/v1/auth/token/`, `POST /api/v1/auth/token/refresh/`
- `GET /api/v1/exams/`, `GET /api/v1/exams/:id/`
- `POST /api/v1/exams/:id/start/`, `POST /api/v1/exams/:id/autosave/`, `POST /api/v1/exams/:id/submit/`
- `GET /api/v1/exams/:id/export/` (ADMIN)

## Permissions
- Read-only for all authenticated users
- Create/update exams: INSTRUCTOR or ADMIN
- Export: ADMIN only
