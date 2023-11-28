from rest_framework import serializers
from .models import SearchHistory

class SearchHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SearchHistory
        fields = ['id', 'user', 'search_query', 'created_at']

class SearchSuggestionSerializer(serializers.Serializer):
    suggestion = serializers.CharField()