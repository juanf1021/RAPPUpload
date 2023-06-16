from rest_framework import serializers
from .models import Beats


class BeatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Beats
        fields = '__all__'
