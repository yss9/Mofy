from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth import get_user_model

from accounts.models import UserData


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = get_user_model()
        fields = ('id', 'userID', 'email', 'password', 'name')


# 패스워드가 필요없는 다른 테이블에서 사용할 용도
class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'userID', 'email', 'name')


class FinduserIDSerializer(serializers.ModelSerializer):
    model = get_user_model()
    fields = {'id', 'name', 'email'}


class UserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserData
        fields = '__all__'

