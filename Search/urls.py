from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('search_suggestions/', views.SearchSuggestionView.as_view()),
    path('popular_search/', views.PopularSearchView.as_view()),
    path('search/<str:q>/', views.PostSearchView.as_view()),
    path('search-history/', views.SearchHistoryView.as_view()),

]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns = format_suffix_patterns(urlpatterns)
