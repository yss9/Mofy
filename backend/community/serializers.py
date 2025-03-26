from rest_framework import serializers
from .models import Board, Comment, Like, Message, ReportBoardList, StyleRank, TagName, TagBoard, PhotoSave


class CommentSerializers(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'comment', 'datetime', 'boardID', 'userID')


class PhotoSaveSerializers(serializers.ModelSerializer):
    class Meta:
        model = PhotoSave
        fields = ('id', 'before_image', 'middle_image', 'result_image')




class BoardSerializers(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = ('boardID', 'title', 'content', 'boardType', 'datetime', 'image', 'like_num', 'price', 'state', 'userID', 'address','tags')



class TagNameSerializers(serializers.ModelSerializer):
    class Meta:
        model = TagName
        fields = ('tagID', 'tagName')

class TagBoardSerializers(serializers.ModelSerializer):
    class Meta:
        model = TagBoard
        fields = ('id', 'boardID', 'tagID')




class LikeSerializers(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ('id', 'boardID', 'userID')




class MessageSerializers(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('id', 'message', 'receiveID', 'sendID')




class ReportBoardListSerializers(serializers.ModelSerializer):
    class Meta:
        model = ReportBoardList
        fields = ('id', 'boardID', 'userID')



class StyleRankSerializers(serializers.ModelSerializer):
    class Meta:
        model = StyleRank
        fields = ('id', 'datetime', 'boardID_1', 'boardID_2', 'boardID_3')






