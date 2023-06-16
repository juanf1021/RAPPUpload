from django.shortcuts import render
from rest_framework import viewsets
from home.serializer import BeatsSerializer
from .models import Beats, contactInformation
from django.http import JsonResponse
from django.core import serializers
import json
# Create your views here.

def home(request):
    return render(request, "templates/home/index.html")

def contact(request):
    return render(request, "templates/home/contact.html")

def privacy(request):
    return render(request,"templates/home/privacy.html")

def terms(request):
    return render(request, "templates/home/terms.html")
def contactInfo(request):
    info = contactInformation.objects.all().first()
    serialized_info = serializers.serialize('json', [info])
    json_data = json.loads(serialized_info)
    return JsonResponse(json_data, safe=False)

class BeatsView(viewsets.ModelViewSet):
    serializer_class = BeatsSerializer
    queryset = Beats.objects.all()