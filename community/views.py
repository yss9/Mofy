from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404

from SignUp.models import User
from .serializers import BoardSerializers, CommentSerializers, LikeSerializers
from .models import Board, Comment, Like


class BoardList(APIView):
    def get(self, request):
        boards = Board.objects.all()

        serializer = BoardSerializers(boards, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = BoardSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BoardDetail(APIView):
    def get(self, request, pk, format=None):
        board = Board.objects.get(pk=pk)
        board_serializer = BoardSerializers(board)
        return Response(board_serializer.data)

    def post(self, request, pk, format=None):
        serializer = CommentSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data)

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



        '''
        like = Like.objects.get(boardID=boardID, userID=userID)
        if like:
            like.delete()
            return Response(status=status.HTTP_200_OK)
        else:
            like.objects.create(userID=userID, boardID=boardID)
            return Response(status=status.HTTP_201_CREATED)
        '''
