from django.contrib import admin
from .models import Exam, Question, Choice, Submission, UserProfile


@admin.register(Exam)
class ExamAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'duration_minutes', 'created_at')


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('id', 'exam', 'text', 'created_at')


@admin.register(Choice)
class ChoiceAdmin(admin.ModelAdmin):
    list_display = ('id', 'question', 'text', 'is_correct')


@admin.register(Submission)
class SubmissionAdmin(admin.ModelAdmin):
    list_display = ('id', 'user_id', 'exam', 'score', 'created_at')


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'role', 'created_at')

# Register your models here.
