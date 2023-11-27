
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import BoardDetail, BoardList, CommentDetail, LikeDetail, CommentPutDel, Report, StyleRankView
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('board/', BoardList.as_view()),
    path('board/<int:pk>/', BoardDetail.as_view()),
    path('board/<int:pk>/comment/', CommentDetail.as_view()),
    path('board/<int:pk>/like', LikeDetail.as_view()),
    path('board/comment/<int:pk>', CommentPutDel.as_view()),
    path('board/<int:pk>/report', Report.as_view()),
    path('board/stylerank', StyleRankView.as_view()),
    # path('Test/', Test.as_view())

]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns = format_suffix_patterns(urlpatterns)
