from turtle import title
from rest_framework.documentation import include_docs_urls
from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'Beats', views.BeatsView, 'Beats')
urlpatterns = [
    path('', views.home, name="Home"),
    path('contact', views.contact, name="Contact"),
    path('privacy', views.privacy,name="Privacy" ),
    path('terms', views.terms,name="Terms" ),
    path('infoCont', views.contactInfo, name = "contactInfo"),
    path('api/v1/', include(router.urls)),
    path('docs/', include_docs_urls(title= "Rapp API"))
]