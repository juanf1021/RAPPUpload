from channels.generic.websocket import AsyncJsonWebsocketConsumer

class VideoChat(AsyncJsonWebsocketConsumer):
    async def connect(self):
        await self.accept()
    
    async def receive_json(self, content):
        if(content['command'] == 'join_room'):
            await self.channel_layer.group_add(content['room'],self.channel_name)
            print('added')
        elif(content['command'] == 'join'):
            await self.channel_layer.group_send(content['room'],{
                'type':'join.message',
            })
            
        elif(content['command'] == 'offer'):
            await self.channel_layer.group_send(content['room'],{
                'type':'offer.message',
                'offer':content['offer']
            })
        elif(content['command'] == 'answer'):
            await self.channel_layer.group_send(content['room'],{
                'type':'answer.message',
                'answer':content['answer']
            })
        elif(content['command'] == 'candidate'):
            await self.channel_layer.group_send(content['room'],{
                'type':'candidate.message',
                'candidate':content['candidate'],
                'iscreated':content['iscreated']
            })
        elif(content['command'] == 'play'):
            await self.channel_layer.group_send(content['room'],{
                'type':'play.message',
            })
        elif(content['command'] == 'pause'):
            await self.channel_layer.group_send(content['room'],{
                'type':'pause.message'
            })
        elif(content['command'] == 'restart'):
            await self.channel_layer.group_send(content['room'],{
                'type':'restart.message'
            })
        elif(content['command'] == 'changeAudio'):
            await self.channel_layer.group_send(content['room'],{
                'type': 'changeAudio.message',
                'src' : content['src']
            })

    async def play_message(self,event):
        await self.send_json({
            'command':'play'
        })

    async def pause_message(self, event):
        await self.send_json({
            'command':'pause'
        })

    async def restart_message(self,event):
        await self.send_json({
            'command':'restart'
        })

    async def changeAudio_message(self, event):
        await self.send_json({
            'command':'changeAudio',
            'src': event['src']
        })

    async def join_message(self,event):
        await self.send_json({
            'command':'join'
        })
    
    async def offer_message(self,event):
        await self.send_json({
            'command':'offer',
            'offer':event['offer']
        })
    
    async def answer_message(self,event):
        await self.send_json({
            'command':'answer',
            'answer':event['answer']
        })
    
    async def candidate_message(self,event):
        await self.send_json({
            'command':'candidate',
            'candidate':event['candidate'],
            'iscreated':event['iscreated']
        })