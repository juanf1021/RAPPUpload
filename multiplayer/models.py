from tabnanny import verbose
from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Chat(models.Model):
    room_name = models.CharField(max_length=255)
    allowed_users = models.CharField(max_length=255) 
    class Meta:
        verbose_name = "Chat"
        verbose_name_plural = "Chats"

class Channel(models.Model):
    channel_name =models.CharField(max_length=255, unique=True)
    users = models.PositiveBigIntegerField(default=0)
    occupied = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Channel"
        verbose_name_plural = "Channels"

    