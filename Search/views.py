from django.contrib.sites import requests

from Search.serializers import SearchHistorySerializer
from community.models import Board, TagName
from .models import SearchHistory
from django.db.models import Count, Max

from rest_framework import status
from rest_framework.decorators import permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import SearchSuggestionSerializer
from django.db.models import Q
from django.db.models import Max
from django.db.models import F
from django.db import IntegrityError

from django.db import IntegrityError

@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])

class PostSearchView(APIView):
    def post(self, request):
        query = request.data.get('query')

        if not query:
            return Response({"success": False, "message": "검색어가 필요합니다."}, status=status.HTTP_400_BAD_REQUEST)

        user = request.user

        # 동일한 유저와 동일한 검색어가 이미 존재하는지 확인
        existing_search_history = SearchHistory.objects.filter(user=user, query=query).first()

        if not existing_search_history:
            # 다른 유저가 동일한 검색어를 검색한 결과가 있는지 확인
            other_user_search_history = SearchHistory.objects.filter(~Q(user=user), query=query)

            if other_user_search_history.exists():
                # 다른 유저가 동일한 검색어를 검색한 결과가 있는 경우 (저장)
                SearchHistory.objects.create(user=user, query=query)
            else:
                # 검색 결과가 없는 경우 또는 동일한 유저가 다른 검색어를 저장하는 경우 (저장)
                SearchHistory.objects.create(user=user, query=query)

        # Board 모델의 title로 검색
        search_results = Board.objects.filter(Q(title__icontains=query) | Q(tags__icontains=query)).distinct()

        # 검색 결과를 직렬화하여 응답
        response_data = {
            "success": True,
            "message": "검색 기록이 저장되었습니다.",
            "search_results": [{"boardID": result.boardID, "title": result.title, "tags": result.tags.split(',')} for result in search_results]
        }
        return Response(response_data, status=status.HTTP_201_CREATED)


class SearchHistoryView(APIView):
    def get(self, request):
        user = request.user

        recent_search_history = SearchHistory.objects.filter(user=user) \
            .values('query') \
            .annotate(latest_search=Max('searched_at')) \
            .order_by('-latest_search')

        # recent_search_history에서 검색어만 추출
        recent_search_queries = [item['query'] for item in recent_search_history]

        # 최근 검색어에 해당하는 전체 검색 기록 가져오기
        search_history = SearchHistory.objects.filter(
            user=user,
            query__in=recent_search_queries
        ) \
                             .order_by('-searched_at')[:5]

        response_data = {
            "success": True,
            "message": "최근 검색어 및 검색 기록이 성공적으로 불러와졌습니다.",
            "search_history": [
                {"query": result.query, "searched_at": result.searched_at}
                for result in search_history
            ]
        }
        return Response(response_data, status=status.HTTP_200_OK)



@authentication_classes([JWTAuthentication])  # JWTAuthentication을 사용하여 토큰 검증
@permission_classes([IsAuthenticated])  # 인증된 사용자만 접근 허용
class PopularSearchView(APIView):
    def get(self, request):
        # 가장 많이 검색된 인기 검색어를 가져오기
        popular_search = SearchHistory.objects.values('query') \
            .annotate(search_count=Count('query')) \
            .order_by('-search_count')[:5]

        popular_search_serializer = SearchHistorySerializer(popular_search, many=True)

        response_data = {
            "success": True,
            "message": "검색 기록이 저장되었습니다.",
            "popular_results": popular_search_serializer.data,  # popular_search_serializer를 사용하여 데이터 직렬화
        }

        return Response(response_data, status=status.HTTP_201_CREATED)
@authentication_classes([JWTAuthentication])  # JWTAuthentication을 사용하여 토큰 검증
@permission_classes([IsAuthenticated])  # 인증된 사용자만 접근 허용
class SearchSuggestionView(APIView):
    def get(self, request):
        # 현재 사용자의 검색 기록에서 추천 검색어 생성
        user_search_history = SearchHistory.objects.filter(user=request.user)

        # 검색 기록에서 가장 많이 검색된 검색어 가져오기
        popular_search = user_search_history.values('query') \
            .annotate(search_count=Count('query')) \
            .order_by('-search_count')[:5]

        # 추천 검색어 생성
        suggestions = [item['query'] for item in popular_search]

        # 검색 기록에 없는 검색어도 추가
        unique_searches = user_search_history.values_list('query', flat=True).distinct()
        for search in unique_searches:
            if search not in suggestions:
                suggestions.append(search)
                if len(suggestions) >= 5:
                    break

        # 검색어를 직렬화
        suggestion_serializer = SearchSuggestionSerializer({'suggestion': suggestions})

        response_data = {
            "success": True,
            "message": "검색 기록이 저장되었습니다.",
            "suggestion_results": suggestion_serializer.data,  # popular_search_serializer를 사용하여 데이터 직렬화
        }

        return Response(suggestion_serializer.data, status=status.HTTP_200_OK)
