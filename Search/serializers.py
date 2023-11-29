from rest_framework import serializers
from .models import SearchHistory


class PopularSearchSerializer(serializers.Serializer):
    query = serializers.CharField()
class SearchHistorySerializer(serializers.Serializer):
    query = serializers.CharField()
    searched_at = serializers.DateTimeField()

class SearchSuggestionSerializer(serializers.Serializer):
    suggestion = serializers.CharField()