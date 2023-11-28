from django.contrib.sites import requests

from Search.serializers import SearchHistorySerializer
from community.models import Board, TagName
from .models import SearchHistory
from django.db.models import Count

from rest_framework import status
from rest_framework.decorators import permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import SearchSuggestionSerializer
from django.db.models import Q
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class PostSearchView(APIView):
    def post(self, request):
        search_query = request.data.get('search_query')

        if not search_query:
            return Response({"success": False, "message": "검색어가 필요합니다."}, status=status.HTTP_400_BAD_REQUEST)

        user = request.user
        # 검색 기록 저장
        SearchHistory.objects.create(user=user, search_query=search_query)

        # Board 모델의 title과 TagName 모델의 tagName으로 검색
        search_results = Board.objects.filter(
            Q(title__icontains=search_query)
        ).distinct() | TagName.objects.filter(
            Q(tagName_icontains=search_query)
        ).distinct()

        # 검색 결과를 직렬화하여 응답
        response_data = {
            "success": True,
            "message": "검색 기록이 저장되었습니다.",
            "search_results": [{"boardID": result.boardID, "title": result.title} for result in search_results]
        }
        return Response(response_data, status=status.HTTP_201_CREATED)
    # def get(self, request):
    #     q = request.GET.get('q', '')
    #     post_list = Board.objects.filter(
    #         Q(title__contains=q) | Q(tagboard__tagName__contains=q)
    #     ).distinct()
    #
    #     if request.user.is_authenticated:
    #         history = SearchHistory.objects.filter(user=request.user, query=q)
    #         if not history.exists():
    #             SearchHistory.objects.create(user=request.user, query=q)
    #
    #     related_tags = TagName.objects.filter(tagboard__boardID__in=post_list).distinct()
    #     related_searches = [tag.tagName for tag in related_tags]
    #
    #     return Response({
    #         'post_list': list(post_list.values()),
    #         'related_searches': related_searches
    #     }, status=status.HTTP_200_OK)
    #
    # def post(self, request, accessToken=None):
    #     search_query = request.data.get('query', '')
    #     if search_query:
    #         # 이전과 동일한 검색 수행...
    #
    #         # 새 엔드포인트를 호출하여 검색 기록 업데이트
    #         response = requests.post(
    #             "http://localhost:8000/post_search_history/",
    #             data={'query': search_query},
    #             headers={'Authorization': f'Bearer {accessToken}'}
    #         )
    #         if response.status_code != 201:
    #             return Response({'error': '검색 기록 업데이트 실패.'}, status=response.status_code)
    #     else:
    #         return Response({'error': '쿼리 파라미터가 필요합니다.'}, status=status.HTTP_400_BAD_REQUEST)

@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class SearchHistoryView(APIView):
    def get(self, request):
        user = request.user
        search_history = SearchHistory.objects.filter(user=user).order_by('-searched_at')[:5]
        serializer = SearchHistorySerializer(search_history, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

@authentication_classes([JWTAuthentication])  # JWTAuthentication을 사용하여 토큰 검증
@permission_classes([IsAuthenticated])  # 인증된 사용자만 접근 허용
class PopularSearchView(APIView):
    def get(self, request):
        # 가장 많이 검색된 인기 검색어를 가져오기
        popular_search = SearchHistory.objects.values('search_query') \
            .annotate(search_count=Count('search_query')) \
            .order_by('-search_count')[:10]

        # 검색 기록을 직렬화
        popular_search_serializer = SearchHistorySerializer(popular_search, many=True)

        return Response(popular_search_serializer.data, status=status.HTTP_200_OK)
@authentication_classes([JWTAuthentication])  # JWTAuthentication을 사용하여 토큰 검증
@permission_classes([IsAuthenticated])  # 인증된 사용자만 접근 허용
class SearchSuggestionView(APIView):
    def get(self, request):
        # 현재 사용자의 검색 기록에서 추천 검색어 생성
        user_search_history = SearchHistory.objects.filter(user=request.user)

        # 검색 기록에서 가장 많이 검색된 검색어 가져오기
        popular_search = user_search_history.values('search_query') \
            .annotate(search_count=Count('search_query')) \
            .order_by('-search_count')[:5]

        # 추천 검색어 생성
        suggestions = [item['search_query'] for item in popular_search]

        # 검색 기록에 없는 검색어도 추가
        unique_searches = user_search_history.values_list('search_query', flat=True).distinct()
        for search in unique_searches:
            if search not in suggestions:
                suggestions.append(search)
                if len(suggestions) >= 5:
                    break

        # 검색어를 직렬화
        suggestion_serializer = SearchSuggestionSerializer({'suggestion': suggestions})

        return Response(suggestion_serializer.data, status=status.HTTP_200_OK)
