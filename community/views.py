from datetime import date, timedelta, datetime

from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404

from .serializers import BoardSerializers, CommentSerializers, LikeSerializers, TagNameSerializers, \
    ReportBoardListSerializers, TagBoardSerializers
from .models import Board, Comment, Like, TagName, ReportBoardList, TagBoard


class BoardList(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        boards = Board.objects.all()
        serializer = BoardSerializers(boards, many=True)
        return Response(serializer.data)



    def post(self, request):
        board_serializer = BoardSerializers(data=request.data)
        if board_serializer.is_valid():
            board = board_serializer.save()
            print(board.boardID)
            return Response(board_serializer.data, status=status.HTTP_201_CREATED)
        return Response(board_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


'''
    def post(self, request):
        boardID = Board.objects.last()
        tags = request.data['tags'].split(',')
        for tag in tags:
            if TagName.objects.get(tagName = tag):
                tags =TagName.objects.get(tagName = tag)
                TagBoard.objects.create(tagID=tags.tagID, boardID=boardID)
            else:
                TagName.objects.create(tagName=tag)
                TagBoard.objects.create(tagName=tag, BoardID=boardID)
        return Response(status=status.HTTP_200_OK)
'''



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
                return Response(serializer.data)
            return Response(status=status.HTTP_400_BAD_REQUEST)



class Report(APIView):
    def get(self, request,pk):
        reportList = ReportBoardList.objects.all()
        reportList_serializer = ReportBoardListSerializers(reportList, many=True)
        return Response(reportList_serializer.data,status=status.HTTP_200_OK)

    def post(self, request, pk):
        boardID = request.data['boardID']
        userID = request.data['userID']
        reportBoard = ReportBoardList.objects.filter(boardID=boardID, userID=userID)
        if reportBoard:
            return Response(status=status.HTTP_208_ALREADY_REPORTED)
        else:
            report_serializer = ReportBoardListSerializers(data=request.data)
            if report_serializer.is_valid():
                report_serializer.save()
                return Response(report_serializer.data, status=status.HTTP_201_CREATED)
            return Response(report_serializer.data, status=status.HTTP_400_BAD_REQUEST)



class StyleRankView(APIView):
    def get(self, request):
        one_week = datetime.now() - timedelta(days=7)
        styleranks = Board.objects.filter(datetime__gte=one_week).order_by('-like_num')[:4]
        print(styleranks.values())
        serializers = BoardSerializers(styleranks, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)




