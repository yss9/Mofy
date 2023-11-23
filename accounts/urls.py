from django.urls import include, path
from . import views

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
]