from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import BoardDetail, BoardList, CommentDetail, LikeDetail, CommentPutDel

urlpatterns = [
    path('board/', BoardList.as_view()),
    path('board/<int:pk>/', BoardDetail.as_view()),
    path('board/<int:pk>/comment/', CommentDetail.as_view()),
    path('board/<int:pk>/like', LikeDetail.as_view()),
    path('board/comment/<int:pk>', CommentPutDel.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)