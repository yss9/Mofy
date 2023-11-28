from datetime import date, timedelta, datetime

from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import BoardSerializers, CommentSerializers, LikeSerializers, TagNameSerializers, \
    ReportBoardListSerializers, TagBoardSerializers, PhotoSaveSerializers
from .models import Board, Comment, Like, TagName, ReportBoardList, TagBoard, PhotoSave


class Test(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = PhotoSaveSerializers(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk):
        photo = PhotoSave.objects.get(pk=pk)
        serializer = PhotoSaveSerializers(photo)
        return Response(serializer.data)


class BoardList(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        boards = Board.objects.all()
        serializer = BoardSerializers(boards, many=True)
        return Response(serializer.data)



    def post(self, request):
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


class TagDetail(APIView):
    def get(self,request,pk):
        tagd = TagBoard.objects.filter(boardID=pk)
        tag_names = []
        for tags in tagd:
            tag_names.append(tags.tagID)

        serializers = TagNameSerializers(tag_names, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)


class SelectBoardType(APIView):
    def get(self, request, pk, format=None):
        board = Board.objects.filter(boardType=pk)
        serializer = BoardSerializers(board, many=True)
        return Response(serializer.data)


class BoardDetail(APIView):
    permission_classes = [AllowAny]
    def get(self, request, pk, format=None):
        board = Board.objects.get(pk=pk)
        board_serializer = BoardSerializers(board)
        return Response(board_serializer.data)


    def post(self, request, pk, format=None):
        serializer = CommentSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)



    def put(self, request, pk, format=None):
        board = Board.objects.get(pk=pk)
        serializer = BoardSerializers(board, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        board = Board.objects.get(pk=pk)
        board.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



class CommentDetail(APIView):
    def get(self, request, pk, format=None):
        board = Board.objects.get(pk=pk)
        boardID = board.boardID
        comment = Comment.objects.filter(boardID=boardID)
        comment_serializer = CommentSerializers(comment, many=True)
        return Response(comment_serializer.data)



class CommentPutDel(APIView):
    def put(self, request, pk, format=None):
        comment = Comment.objects.get(pk=pk)
        serializer = CommentSerializers(comment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        comment = Comment.objects.get(pk=pk)
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



class LikeDetail(APIView):
    def get(self, request, pk, format=None):
        board = Board.objects.get(pk=pk)
        boardID = board.boardID
        like = Like.objects.filter(boardID=boardID)
        like_serializer = LikeSerializers(like, many=True)
        return Response(like_serializer.data)

    def post(self, request, pk, format=None):
        boardID = request.data['boardID']
        userID = request.data['userID']
        like = Like.objects.filter(boardID=boardID, userID=userID)
        if like:
            like.delete()
            return Response(status=status.HTTP_200_OK)
        else:
            serializer = LikeSerializers(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_400_BAD_REQUEST)



class Report(APIView):
    def get(self, request,pk):
        reportList = ReportBoardList.objects.all()
        reportList_serializer = ReportBoardListSerializers(reportList, many=True)
        return Response(reportList_serializer.data,status=status.HTTP_200_OK)

    def post(self, request, pk):
        reportBoard = ReportBoardList.objects.get(boardID=pk)
        if reportBoard:
            return Response(status=status.HTTP_208_ALREADY_REPORTED)
        else:
            ReportBoardList.objects.create(boardID=pk)
            return Response(status=status.HTTP_200_OK)




class StyleRankView(APIView):
    def get(self, request):
        one_week = datetime.now() - timedelta(days=7)
        styleranks = Board.objects.filter(datetime__gte=one_week).order_by('-like_num')[:4]
        print(styleranks.values())
        serializers = BoardSerializers(styleranks, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)



