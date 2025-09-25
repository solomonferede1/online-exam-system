"""Core domain models for the Online Exam System.

Defines timestamp base, exams, questions, choices, submissions (legacy),
user profile with roles, attempts and answers for autosave and scoring.
"""

from django.db import models
from django.contrib.auth.models import User

class TimestampedModel(models.Model):
    """Abstract base model that tracks creation and update timestamps."""
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Exam(TimestampedModel):
    """An exam containing many questions with a fixed duration."""
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    duration_minutes = models.PositiveIntegerField(default=60)

    def __str__(self):
        return self.title


class Question(TimestampedModel):
    """A question that belongs to a specific exam."""
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE, related_name='questions')
    text = models.TextField()

    def __str__(self):
        return f"Q: {self.text[:50]}"


class Choice(TimestampedModel):
    """A possible answer choice for a multiple-choice question."""
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='choices')
    text = models.CharField(max_length=500)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.text


class Submission(TimestampedModel):
    """Legacy submission record with a computed score per exam per user."""
    user_id = models.IntegerField()  # can be replaced with FK to auth.User later
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE, related_name='submissions')
    score = models.FloatField(default=0.0)

    def __str__(self):
        return f"Submission {self.id} - Exam {self.exam_id}"


class UserProfile(TimestampedModel):
    """Profile for a Django user including a single role used for RBAC."""
    class Roles(models.TextChoices):
        ADMIN = 'ADMIN', 'Admin'
        INSTRUCTOR = 'INSTRUCTOR', 'Instructor'
        STUDENT = 'STUDENT', 'Student'
        DEPARTMENT_HEAD = 'DEPARTMENT_HEAD', 'Department Head'
        HR = 'HR', 'HR'

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    role = models.CharField(max_length=20, choices=Roles.choices, default=Roles.STUDENT)

    def __str__(self):
        return f"{self.user.username} ({self.role})"


class Attempt(TimestampedModel):
    """An active or completed attempt of a user taking an exam."""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='attempts')
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE, related_name='attempts')
    started_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Attempt {self.id} - {self.user.username} - {self.exam.title}"


class Answer(TimestampedModel):
    """User's response for a question within an attempt (supports autosave)."""
    attempt = models.ForeignKey(Attempt, on_delete=models.CASCADE, related_name='answers')
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    selected_choice = models.ForeignKey(Choice, null=True, blank=True, on_delete=models.SET_NULL)
    text_response = models.TextField(blank=True)

    class Meta:
        unique_together = ('attempt', 'question')
