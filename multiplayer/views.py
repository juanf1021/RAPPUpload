from django.http import HttpResponse
from msilib.schema import AppId
from ntpath import join
from unicodedata import name
from django.shortcuts import render, get_object_or_404 
from agora_token_builder import RtcTokenBuilder
from django.http import JsonResponse
from .models import Channel
from home import models
import random 
import time
# Create your views here.

def token(request,channel):
    appId= 'a041f9bba2124bb88d28d6c084fa9b0f'
    appCertificate= '4c760764ae5f493fa5b745f781e0a7f9'
    channelName = channel
    #channelName = type(channelName)
    uid = random.randint(1,230)
    expirationTimeInSeconds= 3600 * 24
    currentTimeStamp = time.time() 
    privilegeExpiredTs = currentTimeStamp + expirationTimeInSeconds
    role =  1
    token = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, role, privilegeExpiredTs)
    return JsonResponse({'token':token, 'uid':uid}, safe=False)
    #return JsonResponse({'channel':channelName}, safe=False)

def lobby(request):
    beats = models.Beats.objects.all()
    first_beat = models.Beats.objects.first()
    return render(request,"multi/lobby.html", {"beats":beats, "first": first_beat})

def room(request):
    return render(request, 'multi/room.html')



#!! MAKE SECURITY BETTER FOR THESE FUNCTIONS
def channel_join(request):
    def change_users(boolean):
        if boolean:
            channel.users += 1
        else:
            channel.users -= 1
        channel.save()
    
    #look for all channels with 2 users and set ocuppied as true
    channels = Channel.objects.filter(users=2)
    for channel in channels:
        channel.occupied = True
        channel.save()
    try:
        #returns the first channel with only 1 user inside
        channel = Channel.objects.filter(users = 1).first()
        #update users number
        change_users(True)
        return JsonResponse({'channel_name': channel.channel_name,'users': channel.users}, safe=False)
    except:
        try:
            #search for the first channel not occupied
            channel = Channel.objects.filter(occupied = False).first()
            change_users(True)
            return JsonResponse({'channel_name': channel.channel_name,'users': channel.users}, safe=False)
        except: 
            #creates a new channel when all are occupied
            channel = Channel.objects.all().last()
            channel_name = channel.channel_name
            new_number = int(channel_name[-1]) + 1
            channel_name = channel_name[:-1] + str(new_number)
            new_channel = Channel.objects.create(channel_name = channel_name, users = 1)
            new_channel.save()
            channel = Channel.objects.filter(occupied = False).first()
            return JsonResponse({'channel_name': channel.channel_name,'users': channel.users}, safe=False)

def channel_left(request, channel_name):
    #update number of users when user left
    channel = Channel.objects.get(channel_name = channel_name)
    channel.users -= 1
    channel.save()
    return JsonResponse(({'channel': channel.channel_name, 'users': channel.users}), safe = False)