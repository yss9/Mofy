from django.urls import path
from . import views

urlpatterns = [
    path('tag/<str:slug>/', views.tag_page),
]