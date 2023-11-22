from django.urls import path, include
from rest_authtoken.urls import router

from . import views
from .views import RegisterAPIView, AuthView

urlpatterns = [
#    path("", include(router.urls)),
#    path('Signup/', views.UserCreate.as_view()),
#    path("register/", RegisterAPIView.as_view()),
#    path("auth/", AuthView.as_view()),

]
