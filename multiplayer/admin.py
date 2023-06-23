from django.contrib import admin
from .models import Channel
from .models import Chat
# Register your models here.

class Chat_admin(admin.ModelAdmin):
    list_display = ("room_name", "allowed_users")
    search_fields=("room_name", "allowed_users")
admin.site.register(Chat, Chat_admin)                                  
class Channel_admin(admin.ModelAdmin):
    list_display = ("channel_name", "users")
    search_fields=("channel_name", "users")

admin.site.register(Channel, Channel_admin)