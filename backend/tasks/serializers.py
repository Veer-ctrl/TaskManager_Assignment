from datetime import date
from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"
        read_only_fields = ["user", "created_at", "updated_at"]

    def validate_title(self, value):
        value = value.strip()

        if not value:
            raise serializers.ValidationError("Title is required.")

        if len(value) < 3:
            raise serializers.ValidationError(
                "Title must contain at least 3 characters."
            )

        return value

    def validate_due_date(self, value):
        if value < date.today():
            raise serializers.ValidationError(
                "Due date cannot be in the past."
            )

        return value