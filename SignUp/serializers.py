from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User, UserData


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('userID', 'email', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):  # 유효성 검증?
        user = User.objects.create_user(
            userID=validated_data['userID'],
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user


class LoginUserSerializer(serializers.Serializer):
    userID = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Unable to log in with provided credentials.")


class UserDataSerializers(serializers.ModelSerializer):
    class Meta:
        model = UserData
        fields = ('id', 'height', 'weight', 'shoeType', 'clothType', 'userID')


class UserJWTSignupSerializer(serializers.ModelSerializer):
    userID = serializers.CharField(
        required=True,
        write_only=True,
        max_length=30
    )

    email = serializers.DateField(
        required=True,
        write_only=True,
    )

    username = serializers.CharField(
        required=True,
        write_only=True,
        max_length=30
    )

    password = serializers.CharField(
        required=True,
        write_only=True,
        style={'input_type': 'password'}
    )

    class Meta(object):
        model = User
        fields = ['userID', 'email', 'username', 'password']

    def save(self, validated_data):  # 유효성 검증?
        user = User.objects.create_user(
            userID=validated_data['userID'],
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user

    def validate(self, data):
        userID = data.get('userID', None)

        if User.objects.filter(userID=userID).exists():
            raise serializers.ValidationError("user already exists")

        return data


class JWTLoginSerializer(serializers.ModelSerializer):
    userID = serializers.CharField(
        required=True,
        write_only=True,
    )

    password = serializers.CharField(
        required=True,
        write_only=True,
        style={'input_type': 'password'}
    )

    class Meta(object):
        model = User
        fields = ['userID', 'password']

    def validate(self, data):
        userID = data.get('userID', None)
        password = data.get('password', None)

        if User.objects.filter(userID=userID).exists():
            user = User.objects.get(userID=userID)

            if not user.check_password(password):
                raise serializers.ValidationError("wrong password")
        else:
            raise serializers.ValidationError("user account not exist")

        token = RefreshToken.for_user(user)
        refresh = str(token)
        access = str(token.access_token)

        data = {
            'user': user,
            'refresh': refresh,
            'access': access,
        }

        return data
