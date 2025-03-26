
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import BoardDetail, BoardList, CommentDetail, LikeDetail, CommentPutDel, Report, StyleRankView, Test, \
    SelectBoardType, GetMyBoard, GetMyLikeBoard, ReportList, Chat, MessageBox, MessageDetail, StyleOne, \
    StyleTwo, StyleThree, StyleFour  # SearchTag
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('board/', BoardList.as_view()),
    path('board/<int:pk>/', BoardDetail.as_view()),
    path('board/<int:pk>/comment/', CommentDetail.as_view()),
    path('board/<int:pk>/like/', LikeDetail.as_view()),
    path('board/comment/<int:pk>/', CommentPutDel.as_view()),
    path('board/<int:pk>/report/', Report.as_view()),
    path('board/reportlist/',ReportList.as_view()),
    path('board/stylerank/1/', StyleOne.as_view()),
    path('board/stylerank/2/', StyleTwo.as_view()),
    path('board/stylerank/3/', StyleThree.as_view()),
    path('board/stylerank/4/', StyleFour.as_view()),
    path('boardType/<int:pk>/', SelectBoardType.as_view()),
    path('myboard/<int:pk>/', GetMyBoard.as_view()),
    path('mylike/', GetMyLikeBoard.as_view()),
    # path('search/', SearchTag.as_view()),
    path('chat/', Chat.as_view()),
    path('message_box/<int:pk>/', MessageBox.as_view()),
    path('message_detail/<int:pk>/',MessageDetail.as_view()),
    path('Test/', Test.as_view())

]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns = format_suffix_patterns(urlpatterns)
