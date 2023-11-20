from .models import Tag
from django.shortcuts import render
from .models import Post, Category, Comment
from django.db.models import Q
from .models import SearchHistory
from django.db.models import Count
def tag_page(request, slug):
    tag = Tag.objects.get(slug=slug)
    post_list = tag.post_set.all()

    return render(
        request,
        'blog/post_list.html',
        {
            'post_list': post_list,
            'tag': tag,
            'categories': Category.objects.all(),
            'no_category_post_count': Post.objects.filter(category=None).count(),
        }
    )

class PostSearch(PostList):
    paginate_by = None

    def get_queryset(self):
        q = self.kwargs['q']
        post_list = Post.objects.filter(
            Q(title__contains=q) | Q(tags__name__contains=q)
        ).distinct()

        # 검색 기록 저장
        if self.request.user.is_authenticated:
            # 동일한 검색어로 검색한 기록이 있는지 확인
            history = SearchHistory.objects.filter(user=self.request.user, query=q)
            if not history.exists():
                SearchHistory.objects.create(user=self.request.user, query=q)

        # 연관 검색어 추천
        related_tags = Tag.objects.filter(post__in=post_list).distinct()
        self.related_searches = [tag.name for tag in related_tags]

        return post_list

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['related_searches'] = self.related_searches
        return context

class SearchHistoryView(LoginRequiredMixin, ListView):
    model = SearchHistory
    template_name = 'search_history.html'
    context_object_name = 'search_history'

    def get_queryset(self):
        return SearchHistory.objects.filter(user=self.request.user).order_by('-searched_at')


class PopularSearchView(ListView):
    template_name = 'popular_search.html'
    context_object_name = 'popular_search'

    def get_queryset(self):
        return SearchHistory.objects.values('query') \
            .annotate(query_count=Count('query')) \
            .order_by('-query_count')[:10]
