from django.urls import path
from . import views

urlpatterns = [
    path('search_suggestions/', views.SearchSuggestionView.as_view()),
    path('popular_search/', views.PopularSearchView.as_view()),
    path('search/<str:q>/', views.PostSearch.as_view()),
    path('search_history/', views.SearchHistoryView.as_view(), name='search_history'),
]