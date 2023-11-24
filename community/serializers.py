from rest_framework import serializers
from .models import Board, Comment, Like, Message, ReportBoardList, StyleRank, TagBoard, Tag


class BoardSerializers(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = ('boardID', 'title', 'content', 'boardType', 'datetime', 'image', 'like_num', 'price', 'state', 'userID', 'address')

class CommentSerializers(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'comment', 'datetime', 'nickname', 'boardID', 'userID')


class LikeSerializers(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ('id', 'boardID', 'userID')




class MessageSerializers(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('id', 'message', 'boardID', 'receiveID', 'sendID')




class ReportBoardListSerializers(serializers.ModelSerializer):
    class Meta:
        model = ReportBoardList
        fields = ('id', 'boardID', 'userID')



class StyleRankSerializers(serializers.ModelSerializer):
    class Meta:
        model = StyleRank
        fields = ('id', 'datetime', 'boardID_1', 'boardID_2', 'boardID_3')


class TagSerializers(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('tagID', 'tagName')


class TagBoardSerializers(serializers.ModelSerializer):
    class Meta:
        model = TagBoard
        fields = ('id', 'boardID', 'tagID')