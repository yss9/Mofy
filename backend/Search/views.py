from django.contrib.sites import requests
from Search.serializers import SearchHistorySerializer
from community.models import Board
from community.serializers import BoardSerializers
from .models import SearchHistory
from django.db.models import Count, Max
from rest_framework.decorators import permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.db.models import Sum
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from django.db.models import F, Q
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from community.serializers import BoardSerializers


@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class PostSearchView(APIView):
    def post(self, request):
        query = request.data.get('query')

        if not query:
            return Response({"success": False, "message": "검색어가 필요합니다."}, status=status.HTTP_400_BAD_REQUEST)

        user = request.user

        search_results = Board.objects.filter(Q(title__icontains=query) | Q(tags__icontains=query)).distinct()

        existing_search_history = SearchHistory.objects.filter(user=user, query=query).first()

        if existing_search_history:
            existing_search_history.count = F('count') + 1
            existing_search_history.searched_at = timezone.now()  # 현재 시간으로 갱신
            existing_search_history.save()
        else:
            SearchHistory.objects.create(user=user, query=query)

        # Board 모델의 title로 검색
        serializer = BoardSerializers(search_results, many=True)

        return Response(serializer.data, status=status.HTTP_201_CREATED)



@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class SearchHistoryView(APIView):
    def get(self, request):
        user = request.user

        recent_search_history = SearchHistory.objects.filter(user=user) \
            .values('query') \
            .annotate(latest_search=Max('searched_at')) \
            .order_by('-latest_search')

        recent_search_queries = [item['query'] for item in recent_search_history]

        search_history = SearchHistory.objects.filter(
            user=user,
            query__in=recent_search_queries) \
            .order_by('-searched_at')[:5]

        serializer = SearchHistorySerializer(search_history, many=True)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class PopularSearchView(APIView):
    def get(self, request):
        # 가장 많이 검색된 인기 검색어를 가져오기 (order by count)
        popular_search = SearchHistory.objects.values('query') \
            .annotate(search_count=Sum('count')) \
            .order_by('-search_count')[:5]

        # popular_search에서 검색어만 추출
        popular_queries = [item['query'] for item in popular_search]

        return Response({
            "success": True,
            "popular_results1": popular_queries[0],
            "popular_results2": popular_queries[1],
            "popular_results3": popular_queries[2],
            "popular_results4": popular_queries[3],
            "popular_results5": popular_queries[4],
        }, status=status.HTTP_201_CREATED)

@authentication_classes([JWTAuthentication])  # JWTAuthentication을 사용하여 토큰 검증
@permission_classes([IsAuthenticated])  # 인증된 사용자만 접근 허용
class SearchSuggestionView(APIView):
    def get(self, request):
        # 전체 사용자의 검색 기록 가져오기
        all_search_history = SearchHistory.objects.values('query') \
            .annotate(search_count=Count('query')) \
            .order_by('-search_count')

        # TF-IDF 벡터화
        vectorizer = TfidfVectorizer()
        tfidf_matrix = vectorizer.fit_transform(all_search_history.values_list('query', flat=True))

        # 현재 검색어를 TF-IDF 벡터로 변환
        current_query = request.GET.get('query', '')
        current_query_vector = vectorizer.transform([current_query])

        # 코사인 유사도 계산
        cosine_similarities = linear_kernel(current_query_vector, tfidf_matrix).flatten()

        # 유사도가 높은 순서대로 검색어 정렬
        similar_queries_indices = np.argsort(cosine_similarities)[::-1]

        # 추천 검색어에서 'query'만 추출
        query_only_suggestions = [all_search_history[int(idx)]['query'] for idx in similar_queries_indices]

        return Response({
            "success": True,
            "message": "검색어 추천이 성공적으로 불러와졌습니다.",
            "suggest_results1": query_only_suggestions[0] if query_only_suggestions else None,
            "suggest_results2": query_only_suggestions[1] if len(query_only_suggestions) > 1 else None,
            "suggest_results3": query_only_suggestions[2] if len(query_only_suggestions) > 2 else None,
            "suggest_results4": query_only_suggestions[3] if len(query_only_suggestions) > 3 else None,
            "suggest_results5": query_only_suggestions[4] if len(query_only_suggestions) > 4 else None,
        }, status=status.HTTP_200_OK)

