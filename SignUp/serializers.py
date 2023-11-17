from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('ID', 'email', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):  # 유효성 검증?
        user = User.objects.create_user(
            ID=validated_data['ID'],
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user
