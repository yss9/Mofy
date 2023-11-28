from rest_framework import generics
from .models import ChatRoom, Message, ShopUser, VisitorUser
from .serializers import ChatRoomSerializer, MessageSerializer
from rest_framework.exceptions import ValidationError
from django.http import Http404
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated


# 사용자 정의 예외 클래스, 예외 발생 시 즉각적인 HTTP 응답을 위해 사용됩니다.
class ImmediateResponseException(Exception):
    # 예외 인스턴스를 생성할 때 HTTP 응답 객체를 받습니다.
    def __init__(self, response):
        self.response = response


# 채팅방 목록 조회 및 생성을 위한 뷰 클래스로, DRF의 generics.ListCreateAPIView를 상속받습니다.
@authentication_classes([JWTAuthentication])  # JWTAuthentication을 사용하여 토큰 검증
@permission_classes([IsAuthenticated])  # 인증된 사용자만 접근 허용
class ChatRoomListCreateView(generics.ListCreateAPIView):
    # 이 뷰에서 사용할 시리얼라이저를 지정합니다.
    serializer_class = ChatRoomSerializer

    # GET 요청에 대한 쿼리셋을 정의하는 메소드입니다.
    def get_queryset(self):
        try:
            user_id = self.request.query_params.get('id', None)

            if not user_id:
                raise ValidationError('ID 파라미터가 필요합니다.')

            return ChatRoom.objects.filter(
                shop_user__id=user_id,
            ) | ChatRoom.objects.filter(
                visitor_user__id=user_id
            )
        except ValidationError as e:
            raise e
        except Exception as e:
            content = {'detail': str(e)}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 시리얼라이저의 컨텍스트를 설정하는 메소드입니다.
    def get_serializer_context(self):
        # 부모 클래스의 컨텍스트 가져오기 메소드를 호출합니다.
        context = super(ChatRoomListCreateView, self).get_serializer_context()
        # 컨텍스트에 현재의 요청 객체를 추가합니다.
        context['request'] = self.request
        return context

    # POST 요청을 처리하여 새로운 리소스를 생성하는 메소드입니다.
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            self.perform_create(serializer)
            # 채팅방이 생성되면 생성된 채팅방 정보를 클라이언트에게 전송
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except ImmediateResponseException as e:
            return e.response

        # 시리얼라이저를 통해 데이터베이스에 객체를 저장하는 메소드입니다.

    def perform_create(self, serializer):
        # 요청 데이터에서 shop_user_id과 visitor_user_id을 가져옵니다.  # 수정: 'shop_user_email'을 'id'로 변경
        shop_user_id = self.request.data.get('shop_user_id')  # 수정: 'shop_user_email'을 'id'로 변경
        visitor_user_id = self.request.data.get('visitor_user_id')  # 수정: 'visitor_user_email'을 'id'로 변경

        # 해당 ID로 ShopUser와 VisitorUser를 가져오거나 없으면 생성합니다.
        shop_user, _ = ShopUser.objects.get_or_create(id=shop_user_id)  # 수정: 'shop_user_email'을 'id'로 변경
        visitor_user, _ = VisitorUser.objects.get_or_create(id=visitor_user_id)  # 수정: 'visitor_user_email'을 'id'로 변경

        # 동일한 shop_user_id과 visitor_user_id을 가진 채팅방이 이미 있는지 확인합니다.
        existing_chatroom = ChatRoom.objects.filter(shop_user__id=shop_user_id,  # 수정: 'shop_user_email'을 'id'로 변경
                                                    visitor_user__id=visitor_user_id).first()  # 수정: 'visitor_user_email'을 'id'로 변경

        # 이미 존재하는 채팅방이 있다면 해당 채팅방의 정보를 시리얼라이즈하여 응답합니다.
        if existing_chatroom:
            serializer = ChatRoomSerializer(existing_chatroom, context={'request': self.request})
            raise ImmediateResponseException(Response(serializer.data, status=status.HTTP_200_OK))

        # 새 채팅방 객체를 저장합니다.
        serializer.save(shop_user=shop_user, visitor_user=visitor_user)


# 메시지 목록을 조회하는 뷰 클래스로, DRF의 generics.ListAPIView를 상속받습니다.

class MessageListView(generics.ListAPIView):
    # 이 뷰에서 사용할 시리얼라이저를 지정합니다.
    serializer_class = MessageSerializer

    # GET 요청에 대한 쿼리셋을 정의하는 메소드입니다.
    def get_queryset(self):
        # URL 파라미터에서 'room_id' 값을 가져옵니다.
        room_id = self.kwargs.get('room_id')

        # room_id가 제공되지 않았을 경우 에러 메시지와 함께 400 상태 코드 응답을 반환합니다.
        if not room_id:
            content = {'detail': 'room_id 파라미터가 필요합니다.'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)

        # room_id에 해당하는 메시지 객체들을 쿼리셋으로 가져옵니다.
        queryset = Message.objects.filter(room_id=room_id)

        # 해당 room_id의 메시지가 존재하지 않을 경우 404 Not Found 예외를 발생시킵니다.
        if not queryset.exists():
            raise Http404('해당 room_id로 메시지를 찾을 수 없습니다.')

        # 쿼리셋을 반환합니다.
        return queryset