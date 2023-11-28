from Search.serializers import SearchHistorySerializer
from community.models import Board, TagName
from .models import SearchHistory
from django.db.models import Count, Q

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

@authentication_classes([JWTAuthentication])  # JWTAuthentication을 사용하여 토큰 검증
@permission_classes([IsAuthenticated])  # 인증된 사용자만 접근 허용
class PostSearchView(APIView):

    def get(self, request):
        q = request.GET.get('q', '')
        post_list = Board.objects.filter(
            Q(title__contains=q) | Q(tagboard__tagName__contains=q)
        ).distinct()

        if request.user.is_authenticated:
            history = SearchHistory.objects.filter(user=request.user, query=q)
            if not history.exists():
                SearchHistory.objects.create(user=request.user, query=q)

        related_tags = TagName.objects.filter(tagboard__boardID__in=post_list).distinct()
        related_searches = [tag.tagName for tag in related_tags]

        return Response({
            'post_list': list(post_list.values()),
            'related_searches': related_searches
        }, status=status.HTTP_200_OK)

@authentication_classes([JWTAuthentication])  # JWTAuthentication을 사용하여 토큰 검증
@permission_classes([IsAuthenticated])  # 인증된 사용자만 접근 허용
class SearchHistoryView(APIView):

    def get(self, request):
        search_history = SearchHistory.objects.filter(user=request.user).order_by('-searched_at')[:5]
        search_history_serializer = SearchHistorySerializer(search_history, many=True)
        return Response(search_history_serializer.data, status=status.HTTP_200_OK)

@authentication_classes([JWTAuthentication])  # JWTAuthentication을 사용하여 토큰 검증
@permission_classes([IsAuthenticated])  # 인증된 사용자만 접근 허용
class PopularSearchView(APIView):

    def get(self, request):
        popular_search = SearchHistory.objects.values('query') \
            .annotate(query_count=Count('query')) \
            .order_by('-query_count')[:10]
        popular_search_serializer = SearchHistorySerializer(popular_search, many=True)
        return Response(popular_search_serializer.data, status=status.HTTP_200_OK)
@authentication_classes([JWTAuthentication])  # JWTAuthentication을 사용하여 토큰 검증
@permission_classes([IsAuthenticated])  # 인증된 사용자만 접근 허용
class SearchSuggestionView(APIView):

    def get(self, request):
        query = request.GET.get('q', '')
        suggestions = SearchHistory.objects.filter(query__icontains=query) \
            .values('query') \
            .annotate(query_count=Count('query')) \
            .order_by('-query_count')[:5]
        suggestions = [item['query'] for item in suggestions]

        return Response(suggestions, status=status.HTTP_200_OK)

