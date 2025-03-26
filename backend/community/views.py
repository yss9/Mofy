import os
from datetime import date, timedelta, datetime

from django.http import JsonResponse
from rembg import remove
from PIL import Image, ImageDraw
import extcolors


from rest_framework import status
from rest_framework.decorators import permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from accounts.models import User
from .serializers import BoardSerializers, CommentSerializers, LikeSerializers, TagNameSerializers, \
    ReportBoardListSerializers, TagBoardSerializers, PhotoSaveSerializers, MessageSerializers
from .models import Board, Comment, Like, TagName, ReportBoardList, TagBoard, PhotoSave, Message


def pal_crt(image):

    save_folder = 'media/uploads/'
    input = Image.open(image)
    output = remove(input)
    output.save('./media/uploads/mid_result.png')
    mid_result_image = PhotoSave()
    mid_result_image.image = 'uploads/mid_result_image.png'
    mid_result_image.save()
    img = Image.open('./media/uploads/mid_result.png')
    colors, pixel_count = extcolors.extract_from_image(img)

    image_size = (len(colors) * 50, 100)
    pixel_width = image_size[0] // len(colors)

    rs_image = Image.new('RGB', image_size)
    draw = ImageDraw.Draw(rs_image)

    x_position = 0
    for color, count in colors:
        draw.rectangle([x_position, 0, x_position + pixel_width, image_size[1]], fill=color)
        x_position += pixel_width

    save_path = os.path.join(save_folder, 'result.png')
    rs_image.save(save_path)
    return rs_image


@permission_classes([IsAuthenticated])
class Test(APIView):

    def get(self, request):
        image = PhotoSave.objects.last()
        serializer = PhotoSaveSerializers(image)
        return Response(serializer.data, status= status.HTTP_200_OK)


    def post(self, request):
        phts = PhotoSave()
        phts.before_image = request.data['before_image']
        image = request.data['before_image']
        pal_crt(image)
        phts.middle_image = 'uploads/mid_result.png'
        phts.result_image = 'uploads/result.png'
        phts.save()
        return Response(status=status.HTTP_200_OK)


@authentication_classes([JWTAuthentication])
class BoardList(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        boards = Board.objects.all()
        serializer = BoardSerializers(boards, many=True)
        return Response(serializer.data)

    permission_classes = [IsAuthenticated]
    def post(self, request):
        if request.user.is_authenticated:
            request.data['userID'] = request.user.id
            board_serializer = BoardSerializers(data=request.data)
            tags = request.data.get('tags', '').split(',')
            if board_serializer.is_valid():
                board_serializer.save()
                board1 = Board.objects.order_by('boardID').last()
                for tag in tags:
                    tagname = TagName()
                    tag_valid = TagName.objects.filter(tagName=tag)
                    if tag_valid:
                        tagn = TagName.objects.get(tagName=tag)
                        tagboard = TagBoard(boardID=board1, tagID=tagn)
                    else:
                        tagname.tagName = tag
                        tagname.save()
                        tagn = TagName.objects.get(tagName=tag)
                        tagboard = TagBoard(boardID=board1, tagID=tagn)
                    tagboard.save()

                return Response(board_serializer.data, status=status.HTTP_201_CREATED)
            return Response(board_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'User is not authenticated.'}, status=status.HTTP_401_UNAUTHORIZED)

@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class TagDetail(APIView):
    def get(self,request,pk):
        tagd = TagBoard.objects.filter(boardID=pk)
        tag_names = []
        for tags in tagd:
            tag_names.append(tags.tagID)

        serializers = TagNameSerializers(tag_names, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)


@authentication_classes([JWTAuthentication])
@permission_classes([AllowAny])
class SelectBoardType(APIView):
    def get(self, request, pk, format=None):
        board = Board.objects.filter(boardType=pk)
        serializer = BoardSerializers(board, many=True)
        return Response(serializer.data)

@authentication_classes([JWTAuthentication])
class BoardDetail(APIView):
    permission_classes = [AllowAny]
    def get(self, request, pk, format=None):
        board = Board.objects.get(pk=pk)
        board_serializer = BoardSerializers(board)
        return Response(board_serializer.data)

    permission_classes = [IsAuthenticated]
    def post(self, request, pk, format=None):
        request.data['userID'] = request.user.id
        serializer = CommentSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


    permission_classes = [IsAuthenticated]
    def put(self, request, pk, format=None):
        request.data['userID'] = request.user.id
        board = Board.objects.get(pk=pk)
        serializer = BoardSerializers(board, data=request.data)
        if board.userID == request.user.id:
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



    permission_classes = [IsAuthenticated]
    def delete(self, request, pk, format=None):
        board = Board.objects.get(pk=pk)
        if board.userID == request.user:
            board.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)



@authentication_classes([JWTAuthentication])
@permission_classes([AllowAny])
class CommentDetail(APIView):
    def get(self, request, pk, format=None):
        board = Board.objects.get(pk=pk)
        boardID = board.boardID
        comment = Comment.objects.filter(boardID=boardID)
        comment_serializer = CommentSerializers(comment, many=True)
        return Response(comment_serializer.data)

@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class CommentPutDel(APIView):
    def put(self, request, pk, format=None):
        request.data['userID'] = request.user.id
        comment = Comment.objects.get(pk=pk)
        serializer = CommentSerializers(comment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        request.data['userID'] = request.user.id
        comment = Comment.objects.get(pk=pk)
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class LikeDetail(APIView):
    def get(self, request, pk, format=None):
        like = Like.objects.filter(boardID=pk)
        like_serializer = LikeSerializers(like, many=True)
        return Response(like_serializer.data)

    def post(self, request, pk, format=None):
        board = Board.objects.get(boardID=pk)
        user = request.user
        like = Like.objects.filter(boardID=board, userID=user)
        if like:
            like.delete()
            board.like_num -= 1
            board.save()
            return Response(status=status.HTTP_200_OK)
        else:
            Like.objects.create(boardID=board, userID=user)
            board.like_num += 1
            board.save()
            return Response(status=status.HTTP_201_CREATED)


@authentication_classes([JWTAuthentication])
@permission_classes([IsAdminUser])
class ReportList(APIView):
    def get(self, request):
        reportList = ReportBoardList.objects.all()
        board_ids = reportList.values_list('boardID', flat=True)
        report_boards = Board.objects.filter(boardID__in=board_ids)
        serializer = BoardSerializers(report_boards, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class Report(APIView):
    def post(self, request, pk):
        board = Board.objects.get(boardID = pk)
        user = board.userID
        report = ReportBoardList()
        report.userID = user
        report.boardID = board
        report.save()
        return Response(status = status.HTTP_200_OK)


@authentication_classes([JWTAuthentication])
@permission_classes([AllowAny])
class StyleRankView(APIView):
    def get(self, request):
        one_week = datetime.now() - timedelta(days=7)
        styleranks = Board.objects.filter(datetime__gte=one_week).order_by('-like_num')[:4]
        serializers = BoardSerializers(styleranks, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)


@authentication_classes([JWTAuthentication])
@permission_classes([AllowAny])
class StyleOne(APIView):
    def get(self, request):
        sorted_records = Board.objects.all().order_by('-like_num')
        first_record = sorted_records[0]
        image = first_record.image
        data = {
            'image': image.url
        }
        return JsonResponse(data)


@authentication_classes([JWTAuthentication])
@permission_classes([AllowAny])
class StyleTwo(APIView):
    def get(self, request):
        sorted_records = Board.objects.all().order_by('-like_num')
        first_record = sorted_records[1]
        image = first_record.image
        data = {
            'image': image.url
        }
        return JsonResponse(data)



@authentication_classes([JWTAuthentication])
@permission_classes([AllowAny])
class StyleThree(APIView):
    def get(self, request):
        sorted_records = Board.objects.all().order_by('-like_num')
        first_record = sorted_records[2]
        image = first_record.image
        data = {
            'image': image.url
        }
        return JsonResponse(data)



@authentication_classes([JWTAuthentication])
@permission_classes([AllowAny])
class StyleFour(APIView):
    def get(self, request):
        sorted_records = Board.objects.all().order_by('-like_num')
        first_record = sorted_records[3]
        image = first_record.image
        data = {
            'image': image.url
        }
        return JsonResponse(data)


@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class GetMyBoard(APIView):
    def get(self, request, pk):
        boardType = pk
        id = request.user.id
        board = Board.objects.filter(boardType = boardType, userID = id)
        serializer = BoardSerializers(board, many = True)
        return Response(serializer.data, status = status.HTTP_200_OK)


@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class GetMyLikeBoard(APIView):
    def get(self, request):
        id = request.user.id
        like = Like.objects.filter(userID = id)
        board_ids = like.values_list('boardID', flat=True)
        liked_boards = Board.objects.filter(boardID__in = board_ids)
        serializer = BoardSerializers(liked_boards, many = True)
        return Response(serializer.data, status = status.HTTP_200_OK)

@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class Chat(APIView):
    def post(self, request):
        receive_id = request.data['receiveID']
        re_user = User.objects.get(userID = receive_id)
        messaged = Message()
        messaged.sendID = request.user
        messaged.receiveID = re_user
        messaged.message = request.data['message']
        messaged.save()
        return Response(status=status.HTTP_200_OK)


@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class MessageBox(APIView):
    def get(self, request, pk):
        us_msg = request.user.id
        if pk == 1:
            messages = Message.objects.filter(sendID = us_msg)
            serializer = MessageSerializers(messages, many=True)
            return Response(serializer.data, status = status.HTTP_200_OK)
        elif pk == 2:
            messages = Message.objects.filter(receiveID = us_msg)
            serializer = MessageSerializers(messages, many = True)
            return Response(serializer.data, status = status.HTTP_200_OK)
        return Response(status=status.HTTP_204_NO_CONTENT)


@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class MessageDetail(APIView):
    def get(self, request, pk):
        message = Message.objects.get(id = pk)
        serializers = MessageSerializers(message)
        return Response(serializers.data, status = status.HTTP_200_OK)



'''

@authentication_classes([JWTAuthentication])
@permission_classes([AllowAny])
class SearchTag(APIView):
    def post(self, request):
        tag = request.data['tag']
        tag_id = TagName.objects.get(tagName=tag)
        tags = TagBoard.objects.filter(tagID = tag_id)
        board_ids = tags.values_list('boardID', flat=True)
        taged_boards = Board.objects.filter(boardID__in = board_ids)
        serializer = BoardSerializers(taged_boards, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
'''
