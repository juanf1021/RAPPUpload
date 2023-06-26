from django.http import HttpResponse
from msilib.schema import AppId
from ntpath import join
from unicodedata import name
from django.shortcuts import render, get_object_or_404 
# from agora_token_builder import RtcTokenBuilder
from django.http import JsonResponse
from .models import Channel
from home.models import Beats
from home import models
import random 
import time
from django.shortcuts import redirect, render
from .models import Chat
# Create your views here.
def index(request):
    if request.method == 'POST':
        room = request.POST['room']
        get_room = Chat.objects.filter(room_name=room)
        if get_room:
            c = get_room[0]
            number = c.allowed_users
            if int(number) < 2:
                number = 2
                return redirect(f'video/{room}/join/')
        else:
            create = Chat.objects.create(room_name=room,allowed_users=1)
            if create:
                return redirect(f'video/{room}/created/')
    return render(request,'multi/index.html')


def video(request,room,created):
    beats = Beats.objects.all()
    first_beat = Beats.objects.first()
    return render(request,'multi/video.html',{'room':room,'created':created, 'beats':beats, 'first':first_beat})



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