from rest_framework import serializers
from community.models import Board, TagName
from .models import SearchHistory
class SearchHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SearchHistory
        fields = '__all__'