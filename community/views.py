from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from .serializers import BoardSerializers
from .models import Board


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
        def get(self, request, pk, format = None):
            board = Board.objects.get(pk=pk)
            serializer = BoardSerializers(board)
            return Response(serializer.data)

        def put(self, request, pk, format = None):
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
