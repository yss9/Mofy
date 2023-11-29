from django.urls import include, path
from . import views
from .views import UserInfoView, UserEdit, Userdelete, Userweight, Userheight, Usershoesize, UserclothType, UserskinType

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
    path('userinfo/', UserInfoView.as_view(), name='user-info'),
    path('userinfo2/', Userweight.as_view(), name='user-info2'),
    path('userinfo3/', Userheight.as_view(), name='user-info3'),
    path('userinfo4/', Usershoesize.as_view(), name='user-info4'),
    path('userinfo5/', UserclothType.as_view(), name='user-info5'),
    path('userinfo6/', UserskinType.as_view(), name='user-info6'),
]