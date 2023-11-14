from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import BoardDetail, BoardList

urlpatterns = [
    path('board/', BoardList.as_view()),
    path('board/<int:pk>/', BoardDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)