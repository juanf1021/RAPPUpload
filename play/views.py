from email.mime import image
from django.shortcuts import render
from play.models import Words, Images
from home.models import Categoria, Beats
from django.http import HttpResponse
import random
from django.http import JsonResponse
from rest_framework import viewsets
from random import sample
from play.serializer import ImagesSerializer, WordsSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
# Create your views here.


class WordsViewSerializer(viewsets.ModelViewSet):
    serializer_class = WordsSerializer
    queryset = Words.objects.all()

# class WordListViewSerializer(viewsets.ModelViewSet):
#     serializer_class = WordsSerializer
#     def get_queryset(self):
#         queryset = Words.objects.order_by('?')[:10]
#         return queryset

class WordListViewSerializer(viewsets.ModelViewSet):
    serializer_class = WordsSerializer

    def get_queryset(self):
        count = int(self.request.query_params.get('count', 300))
        queryset = Words.objects.order_by('?')[:count]
        return queryset

    @action(detail=False, methods=['get'])
    def random_words(self, request):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class ImageViewSerializer(viewsets.ModelViewSet):
    serializer_class = ImagesSerializer
    queryset = Images.objects.all()


def easy(request):
    beats = Beats.objects.all()
    first_beat = Beats.objects.first()
    return render(request,"templates\play\easy.html", {"beats":beats, "first": first_beat})

def hard(request):
    beats = Beats.objects.all()
    first_beat = Beats.objects.first()
    return render(request,"templates\play\hard\hard.html", {"beats":beats, "first": first_beat})

def free(request):
    beats = Beats.objects.all()
    first_beat = Beats.objects.first()
    return render(request,"templates\play\libre\libre.html", {"beats":beats, "first": first_beat})

def images(request):
    beats = Beats.objects.all()
    first_beat = Beats.objects.first()
    return render(request,"templates\play\images\images.html", {"beats":beats, "first": first_beat})

def test(request):
    first_beat = Beats.objects.first()
    return HttpResponse(first_beat)
    # return render(request,"templates\play\itest.html")


#** views to 1v1 mode

def easy1v1(request):
    beats = Beats.objects.all()
    first_beat = Beats.objects.first()
    return render(request,"templates\contra\easy1v1\easy1v1.html", {"beats":beats, "first": first_beat})

# def tournament(request):
#     return render(request,"templates\contra\easy1v1\easy1v1.html", {"beats":beats, "first": first_beat})


def word_list(request):
    # word = Words.objects.get(id = 25466)
    first_word = Words.objects.all().first()
    last_word = Words.objects.all().last()
    lista = []
    number = first_word.id
    for i in range(300):
        random_number = random.randint(first_word.id, last_word.id)
        word = Words.objects.filter(id = random_number).values()
        while not word:
            random_number = random.randint(first_word.id, last_word.id)
            word = Words.objects.filter(id = random_number).values()
        lista.append(list(word))
    return JsonResponse(lista, safe=False)

    # return JsonResponse({"models_to_return": list(lista)})
    # Words.objects.all().delete()
    # return HttpResponse("deleted")


def imagesJson(request):
    first_image = Images.objects.all().first()
    second_image = Images.objects.all().last()
    lista = []
    number_list=[]
    while len(number_list) < 23:
        random_number = random.randint(first_image.id, second_image.id)
        image =Images.objects.filter(id = random_number).values()
        while not image:
            random_number = random.randint(first_image.id, second_image.id)
            image =Images.objects.filter(id = random_number).values()
        if random_number in number_list:
            random_number = random.randint(first_image.id, second_image.id)
        else:
            number_list.append(random_number)
            image =Images.objects.filter(id = random_number).values()
            lista.append(list(image))
    return JsonResponse(lista, safe=False)






# def words(request):
#     found = False
#     response= requests.get('https://palabras-aleatorias-public-api.herokuapp.com/multiple-random').json()
#     if request.method=="POST":
#         try:
#             for i in range(490):
#                 word = response["body"][i]["Word"]
#                 definition = response["body"][i]["DefinitionMD"]
#                 try:
#                     palabra = Words.objects.get(word = word)
#                     found = True
#                 except:
#                     found = False
#                 if found:
#                     i = i + 1
#                 elif definition == "":
#                     i = i + 1
#                 else:
#                     w = Words.objects.create(word = word, definition = definition)
#                     w.save()
#             return render(request,"templates\play\itest.html")
#         except:
#              return render(request,"templates\play\itest.html",
#             {"message": "Sorry, something went wrong"})
#     else:
#         return render(request,"templates\play\itest.html")




