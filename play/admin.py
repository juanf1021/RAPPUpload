from django.contrib import admin
from .models import CategoriaImagen, Images, Words
# Register your models here.

class Words_admin(admin.ModelAdmin):
    search_fields= ("word",)

admin.site.register(Words, Words_admin)
admin.site.register(Images)
admin.site.register(CategoriaImagen)

