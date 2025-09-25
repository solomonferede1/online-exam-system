from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        profile = getattr(request.user, 'profile', None)
        return bool(request.user and request.user.is_authenticated and profile and profile.role == 'ADMIN')


class IsInstructorOrAdmin(BasePermission):
    def has_permission(self, request, view):
        profile = getattr(request.user, 'profile', None)
        if not (request.user and request.user.is_authenticated and profile):
            return False
        return profile.role in ('ADMIN', 'INSTRUCTOR')


class ReadOnlyOrInstructorAdmin(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        profile = getattr(request.user, 'profile', None)
        return bool(request.user and request.user.is_authenticated and profile and profile.role in ('ADMIN', 'INSTRUCTOR'))


