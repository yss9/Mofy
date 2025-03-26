from django.db import models
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from accounts.models import User
import numpy as np

class SearchHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    query = models.CharField(max_length=255)
    searched_at = models.DateTimeField(auto_now_add=True)
    count = models.PositiveIntegerField(default=1)

    class Meta:
        unique_together = ('user', 'query')

    class Meta:
        ordering = ['-searched_at']

    def __str__(self):
        return f'{self.user.username} searched {self.query} at {self.searched_at}'

    @staticmethod
    def get_recommendations(user, current_query):
        # 해당 사용자의 검색 기록 가져오기
        user_search_history = SearchHistory.objects.filter(user=user)

        # TF-IDF 벡터화
        vectorizer = TfidfVectorizer(min_df=1)
        tfidf_matrix = vectorizer.fit_transform(user_search_history.values_list('query', flat=True))

        # 현재 검색어를 TF-IDF 벡터로 변환
        current_query_vector = vectorizer.transform([current_query])

        # 코사인 유사도 계산
        cosine_similarities = linear_kernel(current_query_vector, tfidf_matrix).flatten()

        # 유사도가 높은 순서대로 검색어 정렬
        similar_queries_indices = np.argsort(cosine_similarities)[::-1]

        # 추천 검색어 목록 생성 (현재 검색어는 제외)
        recommended_queries = [user_search_history[int(idx)].query for idx in similar_queries_indices if user_search_history[int(idx)].query != current_query]


        return recommended_queries[:5]  # 상위 5개 추천 검색어 반환
