from django.urls import path, include

from play.models import Words
from . import views

from django.urls import path
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'words', views.WordsViewSerializer, 'Words')
router.register(r'images', views.ImageViewSerializer, 'Images')
router.register(r'wordlist', views.WordListViewSerializer, 'Word List')

urlpatterns = [
    path('/easy', views.easy, name="Easy"),
    path('/hard', views.hard, name="Hard"),
    path('/free', views.free, name="Free"),
    path('/test', views.imagesJson, name="Test"),
    path('/images', views.images, name="Images"),
    path('/data', views.word_list, name="Word-list"),
    #**1v1 urls
    path('/1v1', views.easy1v1, name="Easy1v1"),
    path('/api/v1/wordlist/', views.WordListViewSerializer.as_view({'get': 'random_words'}), name="RandomWords"),
    path('/api/v1/', include(router.urls))
    # path('/tournament', views.tournament, name="Tournament"),
    # path('/mic', views.mic_test, name="Mic")
    # path("/words", views.words, name="Words"),
]