from django.db import models
from django.contrib.auth.models import User

class TimestampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Exam(TimestampedModel):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    duration_minutes = models.PositiveIntegerField(default=60)

    def __str__(self):
        return self.title


class Question(TimestampedModel):
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE, related_name='questions')
    text = models.TextField()

    def __str__(self):
        return f"Q: {self.text[:50]}"


class Choice(TimestampedModel):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='choices')
    text = models.CharField(max_length=500)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.text


class Submission(TimestampedModel):
    user_id = models.IntegerField()  # can be replaced with FK to auth.User later
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE, related_name='submissions')
    score = models.FloatField(default=0.0)

    def __str__(self):
        return f"Submission {self.id} - Exam {self.exam_id}"


class UserProfile(TimestampedModel):
    class Roles(models.TextChoices):
        ADMIN = 'ADMIN', 'Admin'
        INSTRUCTOR = 'INSTRUCTOR', 'Instructor'
        STUDENT = 'STUDENT', 'Student'

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    role = models.CharField(max_length=16, choices=Roles.choices, default=Roles.STUDENT)

    def __str__(self):
        return f"{self.user.username} ({self.role})"
