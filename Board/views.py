from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404

from .serializers import BoardSerializers
from .models import Board

class BoardList(APIView):
    def get(self, requset):
        reviews = Board.objects.all()

        serializer = BoardSerializers(reviews, many=True)
        return Response(serializer.data)


    def post(self, request):
        serializer = BoardSerializers(
            data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BoardDetail(APIView):
        def get_object(self, pk):
            try:
                return Board.objects.get(pk=pk)
            except Board.DoesNotExist:
                raise Http404

            def get(self, request, pk, format = None):
                board = self.get_object(pk)
                serializer = BoardSerializers(board)
                return Response(serializer.data)

            def put(self, request, pk, format = None):
                board = self.get_object(pk)
                serializer = BoardSerializers(board, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            def delete(self, request, pk, format=None):
                board = self.get_object(pk)
                board.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
