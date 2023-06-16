from django.urls import path
from . import views

urlpatterns = [
    path('', views.lobby),
    path('/room', views.room, name="Room"),
    path('/play/<str:channel>/', views.token, name="Multi"), 
    path('/channel_join/', views.channel_join, name="Join"),
    path('/channel_left/<str:channel_name>/', views.channel_left, name="Left" ),
]