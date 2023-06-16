from django.contrib import admin
from .models import Channel
# Register your models here.
                                    
class Channel_admin(admin.ModelAdmin):
    list_display = ("channel_name", "users")
    search_fields=("channel_name", "users")

admin.site.register(Channel, Channel_admin)