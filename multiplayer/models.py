from tabnanny import verbose
from django.db import models

# Create your models here.


class Channel(models.Model):
    channel_name =models.CharField(max_length=255, unique=True)
    users = models.PositiveBigIntegerField(default=0)
    occupied = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Channel"
        verbose_name_plural = "Channels"

    