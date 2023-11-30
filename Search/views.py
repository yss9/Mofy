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


@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class PostSearchView(APIView):
    def post(self, request):
        query = request.data.get('query')

        if not query:
            return Response({"success": False, "message": "검색어가 필요합니다."}, status=status.HTTP_400_BAD_REQUEST)

        user = request.user

        search_results = Board.objects.filter(Q(title__icontains=query) | Q(tags__icontains=query)).distinct()

        # Check if the user has searched the same query before
        existing_search_history = SearchHistory.objects.filter(user=user, query=query).first()

        if existing_search_history:
            # Increment the count for the existing search history
            existing_search_history.count = F('count') + 1
            existing_search_history.save()
        else:
            # Save a new search history for the user and query
            SearchHistory.objects.create(user=user, query=query)

        # Board 모델의 title로 검색
        serializer = BoardSerializers(search_results, many=True)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


# class SearchHistoryView(APIView):
#     def get(self, request):
#         user = request.user
#
#         recent_search_history = SearchHistory.objects.filter(user=user) \
#             .values('query') \
#             .annotate(latest_search=Max('searched_at')) \
#             .order_by('-latest_search')
#
#         # recent_search_history에서 검색어만 추출
#         recent_search_queries = [item['query'] for item in recent_search_history]
#
#         # 최근 검색어에 해당하는 전체 검색 기록 가져오기
#         search_history = SearchHistory.objects.filter(
#             user=user,
#             query__in=recent_search_queries) \
#             .order_by('-searched_at')[:5]
#
#         # 검색 기록을 직렬화
#         serializer = SearchHistorySerializer(search_history, many=True)
#
#
#         return Response({
#             "success": True,
#             "message": "최근 검색어 및 검색 기록이 성공적으로 불러와졌습니다.",
#             "search_history1": serializer.data[0],
#             "search_history2": serializer.data[1],
#             "search_history3": serializer.data[2],
#             "search_history4": serializer.data[3],
#             "search_history5": serializer.data[4],
#         }, status=status.HTTP_201_CREATED)

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

        # Serializer를 사용하여 검색 기록 직렬화
        serializer = SearchHistorySerializer(search_history, many=True)

        return Response(serializer.data)
# class SearchHistoryView(APIView):
#     def get(self, request):
#         user = request.user
#
#         recent_search_history = SearchHistory.objects.filter(user=user) \
#             .values('query') \
#             .annotate(latest_search=Max('searched_at')) \
#             .order_by('-latest_search')
#
#         # recent_search_history에서 검색어만 추출
#         recent_search_queries = [item['query'] for item in recent_search_history]
#
#         # 최근 검색어에 해당하는 전체 검색 기록 가져오기
#         search_history = SearchHistory.objects.filter(
#             user=user,
#             query__in=recent_search_queries) \
#             .order_by('-searched_at')[:5]
#
#         # 직접 응답 데이터를 생성
#         response_data = {
#             "success": True,
#             "message": "최근 검색어 및 검색 기록이 성공적으로 불러와졌습니다.",
#             "search_history": [],
#         }
#
#         # 최근 검색어의 개수만큼 데이터 추가
#         for i, history in enumerate(search_history):
#             data = {
#                 "query": history.query,
#                 # 필요한 다른 필드들도 추가할 수 있습니다.
#             }
#             response_data["search_history"].append(data)
#
#         return Response(response_data, status=status.HTTP_200_OK)

# class SearchHistoryView(APIView):
#     def get(self, request):
#         user = request.user
#
#         recent_search_history = SearchHistory.objects.filter(user=user) \
#             .values('query') \
#             .annotate(latest_search=Max('searched_at')) \
#             .order_by('-latest_search')
#
#         # recent_search_history에서 검색어만 추출
#         recent_search_queries = [item['query'] for item in recent_search_history]
#
#         # 최근 검색어에 해당하는 전체 검색 기록 가져오기
#         search_history = SearchHistory.objects.filter(
#             user=user,
#             query__in=recent_search_queries) \
#             .order_by('-searched_at')[:5]
#
#         # 직접 응답 데이터를 생성
#         search_history_list = [
#             {
#                 "query": history.query,
#                 # 필요한 다른 필드들도 추가할 수 있습니다.
#             }
#             for i, history in enumerate(search_history)
#         ]
#
#         # response_data = {
#         #     "success": True,
#         #     "message": "최근 검색어 및 검색 기록이 성공적으로 불러와졌습니다.",
#         #     "search_history": search_history_list,
#         # }
#
#         return Response({
#             "search_history1": search_history_list,
#             "search_history2": search_history_list[1],
#             "search_history3": search_history_list[2],
#             "search_history4": search_history_list[3],
#             "search_history5": search_history_list[4],
#         }, status=status.HTTP_200_OK)



# @authentication_classes([JWTAuthentication])
# @permission_classes([IsAuthenticated])
# class SearchHistoryView(APIView):
#     def get(self, request):
#         user = request.user
#
#         recent_search_history = SearchHistory.objects.filter(user=user) \
#             .values('query') \
#             .annotate(latest_search=Max('searched_at')) \
#             .order_by('-latest_search')
#
#         # recent_search_history에서 검색어만 추출
#         recent_search_queries = [item['query'] for item in recent_search_history]
#
#         # 최근 검색어에 해당하는 전체 검색 기록 가져오기
#         search_history = SearchHistory.objects.filter(
#             user=user,
#             query__in=recent_search_queries) \
#             .order_by('-searched_at')[:5]
#
#         # Serializer를 사용하여 데이터를 직렬화
#         serializer = SearchHistorySerializer(search_history, many=True)
#
#         # response_data = {
#         #     "search_history": serializer.data,
#         # }
#
#         return Response(serializer.data)

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


# @authentication_classes([JWTAuthentication])  # JWTAuthentication을 사용하여 토큰 검증
# @permission_classes([IsAuthenticated])  # 인증된 사용자만 접근 허용
# class SearchSuggestionView(APIView):
#     def get(self, request):
#         # 현재 사용자의 검색 기록에서 추천 검색어 생성
#         user_search_history = SearchHistory.objects.filter(user=request.user)
#
#         # 검색 기록에서 가장 많이 검색된 검색어 가져오기
#         popular_search = user_search_history.values('query') \
#             .annotate(search_count=Count('query')) \
#             .order_by('-search_count')[:5]
#
#         # 추천 검색어 생성
#         suggestions = [item['query'] for item in popular_search]
#
#         # 검색 기록에 없는 검색어도 추가
#         unique_searches = user_search_history.values_list('query', flat=True).distinct()
#         for search in unique_searches:
#             if search not in suggestions:
#                 suggestions.append(search)
#                 if len(suggestions) >= 5:
#                     break
#
#         # 검색어를 직렬화
#         serializer = SearchSuggestionSerializer({'suggestion': suggestions})
#
#         return Response({
#             "success": True,
#             "message": "최근 검색어 및 검색 기록이 성공적으로 불러와졌습니다.",
#             "suggest_results1": serializer.data[0],
#             "suggest_results2": serializer.data[1],
#             "suggest_results3": serializer.data[2],
#             "suggest_results4": serializer.data[3],
#             "suggest_results5": serializer.data[4],
#         }, status=status.HTTP_201_CREATED)

# @authentication_classes([JWTAuthentication])  # JWTAuthentication을 사용하여 토큰 검증
# @permission_classes([IsAuthenticated])  # 인증된 사용자만 접근 허용
# class SearchSuggestionView(APIView):
#     def get(self, request):
#         # 현재 사용자의 검색 기록에서 추천 검색어 생성
#         user_search_history = SearchHistory.objects.filter(user=request.user)
#
#         # 검색 기록에서 가장 많이 검색된 검색어 가져오기
#         popular_search = SearchHistory.objects.values('query') \
#                 .annotate(search_count=Sum('count')) \
#                 .order_by('-search_count')[:5]
#
#         # 추천 검색어 생성
#         suggestions = [item['query'] for item in popular_search]
#
#         # 검색 기록에 없는 검색어도 추가
#         unique_searches = user_search_history.values_list('query', flat=True).distinct()
#         for search in unique_searches:
#             if search not in suggestions:
#                 suggestions.append(search)
#                 if len(suggestions) >= 5:
#                     break
#
#
#         return Response({
#             "success": True,
#             "message": "최근 검색어 및 검색 기록이 성공적으로 불러와졌습니다.",
#             "suggest_results1": unique_searches[0],
#             "suggest_results2": unique_searches[1],
#             "suggest_results3": unique_searches[2],
#             "suggest_results4": unique_searches[3],
#             "suggest_results5": unique_searches[4],
#         }, status=status.HTTP_201_CREATED)


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

