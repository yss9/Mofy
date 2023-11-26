from django.http import JsonResponse
from django.views import View
from django.db.models import Count, Q
from .models import Post, SearchHistory, Tag

class PostSearchView(View):
    def get(self, request, *args, **kwargs):
        q = request.GET.get('q', '')
        post_list = Post.objects.filter(
            Q(title__contains=q) | Q(tags__name__contains=q)
        ).distinct()

        if request.user.is_authenticated:
            history = SearchHistory.objects.filter(user=request.user, query=q)
            if not history.exists():
                SearchHistory.objects.create(user=request.user, query=q)

        related_tags = Tag.objects.filter(post__in=post_list).distinct()
        related_searches = [tag.name for tag in related_tags]

        return JsonResponse({
            'post_list': list(post_list.values()),
            'related_searches': related_searches
        })

class SearchHistoryView(View):
    def get(self, request, *args, **kwargs):
        search_history = SearchHistory.objects.filter(user=request.user).order_by('-searched_at')
        return JsonResponse(list(search_history.values()), safe=False)

class PopularSearchView(View):
    def get(self, request, *args, **kwargs):
        popular_search = SearchHistory.objects.values('query') \
            .annotate(query_count=Count('query')) \
            .order_by('-query_count')[:10]
        return JsonResponse(list(popular_search.values()), safe=False)

class SearchSuggestionView(View):
    def get(self, request, *args, **kwargs):
        query = request.GET.get('q', '')
        suggestions = SearchHistory.objects.filter(query__icontains=query) \
            .values('query') \
            .annotate(query_count=Count('query')) \
            .order_by('-query_count')[:5]
        suggestions = [item['query'] for item in suggestions]
        return JsonResponse(suggestions, safe=False)

