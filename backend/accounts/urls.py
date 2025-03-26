from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
from . import views
from .views import UserInfoView, UserEdit, Userdelete, Userweight, Userheight, Usershoesize, UserclothType, \
    UserskinType, upload_image, UserImage, Userid, ClothTypeSet, ClothTypeView, SkinTypeSet, SkinTypeView

login_patterns = [
    path('normal/', views.login, name='login'),
]

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', include(login_patterns)),
    path('finduserID/', views.finduserID, name='finduserID'),
    path('reset_password/step1/', views.reset_password_step1, name='reset_password_step1'),
    path('reset_password/step2/', views.reset_password_step2, name='reset_password_step2'),
    path('reset_password/step3/', views.reset_password_step3, name='reset_password_step3'),
    path('useredit/', UserEdit.as_view(), name='user-edit'),
    path('userdelete/', Userdelete.as_view(), name='user-delete'),
    path('userinfoid/', Userid.as_view(), name='user-info0'),
    path('userinfo/', UserInfoView.as_view(), name='user-info'),
    path('userinfo2/', Userweight.as_view(), name='user-info2'),
    path('userinfo3/', Userheight.as_view(), name='user-info3'),
    path('userinfo4/', Usershoesize.as_view(), name='user-info4'),
    path('userinfo5/', UserclothType.as_view(), name='user-info5'),
    path('userinfo6/', UserskinType.as_view(), name='user-info6'),
    path('upload_image/', views.upload_image, name='upload_image'),
    path('user_image/', UserImage.as_view(), name='user_image'),
    path('clothTypeSet/', ClothTypeSet.as_view(), name='clothtype_set'),
    path('clothTypeView/', ClothTypeView.as_view(), name='clothtype_view'),
    path('skinTypeSet/', SkinTypeSet.as_view(), name='skintype_set'),
    path('skinTypeView/', SkinTypeView.as_view(), name='skintype_view'),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)