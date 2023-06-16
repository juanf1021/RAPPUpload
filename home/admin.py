from django.contrib import admin
from .models import Categoria, Beats, contactInformation
# Register your models here.


admin.site.register(Categoria)


class Beats_admin(admin.ModelAdmin):
    list_display=("artist", "name", "estallido","duracion", "cambio")
    readonly_fields=('subido',)
    search_fields= ("artist", "name")

admin.site.register(Beats, Beats_admin)

admin.site.register(contactInformation)
