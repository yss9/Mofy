from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import SearchSuggestionView, PopularSearchView, PostSearchView, SearchHistoryView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('search/', PostSearchView.as_view(), name='post_search'),
    path('search/history/', SearchHistoryView.as_view(), name='search_history'),
    path('search/popular/', PopularSearchView.as_view(), name='popular_search'),
    path('search/suggestions/', SearchSuggestionView.as_view(), name='search_suggestions'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns = format_suffix_patterns(urlpatterns)
