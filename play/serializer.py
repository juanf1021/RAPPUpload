from dataclasses import fields
from pyexpat import model
from rest_framework import serializers
from play.models import Images, Words

class WordsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Words
        fields = '__all__'

class ImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Images
        fields = ('name', 'categoria', 'image')