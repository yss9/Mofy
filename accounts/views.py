from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login

from .serializers import UserSerializer

from .models import User, UserData
from django.http import JsonResponse

@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    userID = request.data.get('userID')
    email = request.data.get('email')
    password = request.data.get('password')
    name = request.data.get('name')

    serializer = UserSerializer(data=request.data)
    serializer.email = email
    serializer.name = name
    serializer.userID = userID

    if serializer.is_valid(raise_exception=True):
        user = serializer.save()
        user.set_password(password)
        user.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    userID = request.data.get('userID')
    password = request.data.get('password')

    user = authenticate(userID=userID, password=password)
    if user is None:
        return Response({'message': '아이디 또는 비밀번호가 일치하지 않습니다.'}, status=status.HTTP_401_UNAUTHORIZED)

    refresh = RefreshToken.for_user(user)
    update_last_login(None, user)

    return Response({
        'success':  True,
        'message': '로그인 성공',
        #token': str(refresh.access_token),
        'refresh_token': str(refresh),
        'access_token': str(refresh.access_token),
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([AllowAny])
def finduserID(request):
    name = request.data.get('name')
    email = request.data.get('email')

    if not email or not name:
        return JsonResponse({'error': 'Email and name are required'}, status=400)

    try:
        user = User.objects.get(email=email, name=name)
        return JsonResponse({'user_id': user.userID})
    except User.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@api_view(['POST'])
@permission_classes([AllowAny])
def reset_password_step1(request):
    userID = request.data.get('userID')

    if not userID:
        return JsonResponse({'error': 'userID is required'}, status=400)

    try:
        user = User.objects.get(userID=userID)
        # Store userID in the session
        #request.session['reset_user_id'] = user.id
        #request.session.save()
        return JsonResponse({'message': 'Step 1 successful',
                             'reset_user_id': user.id})
    except User.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)


@api_view(['POST'])
@permission_classes([AllowAny])
def reset_password_step2(request):
    email = request.data.get('email')
    name = request.data.get('name')
    reset_user_id = request.data.get('reset_user_id')

    if not email or not name:
        return JsonResponse({'error': 'email and name are required'}, status=401)

    # Retrieve userID from the session
    #user_id = request.session.get('reset_user_id')
    #if not user_id:
    #    return JsonResponse({'error': 'Invalid or expired session'}, status=402)

    try:
        user = User.objects.get(id=reset_user_id, email=email, name=name)
        # Store additional data in the session
       # request.session['reset_user_data'] = {'email': email, 'name': name}
        return JsonResponse({'message': 'Step 2 successful',
                             'reset_user_id': user.id})
    except User.DoesNotExist:
        return JsonResponse({'error': 'User not found or invalid session'}, status=404)


@api_view(['POST'])
@permission_classes([AllowAny])
def reset_password_step3(request):
    new_password = request.data.get('new_password', None)
    user_id = request.data.get('user_id')

    if not new_password:
        return JsonResponse({'error': 'new_password is required'}, status=400)

    # Retrieve user data from the session
    #user_data = request.session.get('reset_user_data', None)
    #user_id = request.session.get('reset_user_id', None)

    #if not user_data or not user_id:
    #    return JsonResponse({'error': 'Invalid or expired session'}, status=400)

    try:
        user = User.objects.get(id=user_id)
        # Reset the password
        user.set_password(new_password)
        user.save()

        # Clear session data
        #request.session.pop('reset_user_id', None)
        #request.session.pop('reset_user_data', None)

        return JsonResponse({'message': 'Password reset successfully'})
    except User.DoesNotExist:
        return JsonResponse({'error': 'User not found or invalid session'}, status=404)



@authentication_classes([JWTAuthentication])  # JWTAuthentication을 사용하여 토큰 검증
@permission_classes([IsAuthenticated])  # 인증된 사용자만 접근 허용
def getUsername(self, request):
   user = request.user  # 인증된 사용자 객체
   return Response({"username": user.name})

@authentication_classes([JWTAuthentication])  # JWTAuthentication을 사용하여 토큰 검증
@permission_classes([IsAuthenticated])  # 인증된 사용자만 접근 허용
class UserInfoView(APIView):
    def getusername(self, request):
        user = request.user  # 인증된 사용자 객체
        return Response({"username": user.name})


@authentication_classes([JWTAuthentication])  # JWTAuthentication을 사용하여 토큰 검증
@permission_classes([IsAuthenticated])  # 인증된 사용자만 접근 허용
class UserEdit(APIView):
    def setUserData(self, request):
        user = request.user
        user_data = UserData.objects.get(user=user)
        editname = request.data.name
        editpw = request.data.pw
        editweight = request.data.weight
        editheight = request.data.height

        user.name = editname
        user.set_password(editpw)
        user_data.weight = editweight
        user_data.height = editheight


        return Response({"username": user.name})

