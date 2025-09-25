# Frontend (React + Tailwind)

Purpose: Web UI for the Online Exam System with role-based navigation and exam-taking.

## Setup

1. Create `.env` with `REACT_APP_API_BASE=http://localhost:8000/api/v1`
2. npm install
3. npm start

## Structure
- `src/services/api.js` — API client
- `src/context/AuthContext.js` — auth state
- `src/components/` — Login, ProtectedRoute, RoleRoute, layout
- `src/pages/` — Admin, Instructor, Student sections; ExamList, TakeExam

## Routing
- `/` login/home
- `/exams`, `/exams/:id`
- `/admin/*`, `/instructor/*`, `/student/*` with role guards

## Styling
- Tailwind configured via `tailwind.config.js`, `postcss.config.js`, and `src/index.css`
