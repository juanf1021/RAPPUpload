
let options = 
{
    // Pass your App ID here.
    appId: 'a041f9bba2124bb88d28d6c084fa9b0f',
    // Set the channel name.
    channel: '',
    // Pass your temp token here.
    token: null,
    // Set the user ID.
    uid: null,
    // set numberOfPeople
    users : 0,

};

let channelParameters =
{
  // A variable to hold a local audio track.
  localAudioTrack: null,
  // A variable to hold a remote audio track.
  remoteAudioTrack: null,
    // A variable to hold the remote user id.
  remoteUid: null,
};


async function startBasicCall()
{
  // Create an instance of the Agora Engine
  const agoraEngine = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
  
  // Listen for the "user-published" event to retrieve an AgoraRTCRemoteUser object.
  agoraEngine.on("user-published", async (user, mediaType) =>
  {
    if(options.users >= 2){
      //!! check for this
      console.error("demasiada gente");
    }else{
          // Subscribe to the remote user when the SDK triggers the "user-published" event.
        await agoraEngine.subscribe(user, mediaType);
        console.log("subscribe success");
        //console.error(user);
        //console.error(options.numberOfPeople);
        // Subscribe and play the remote audio track.
        if (mediaType == "audio")
        {
            channelParameters.remoteUid=user.uid;
            // Get the RemoteAudioTrack object from the AgoraRTCRemoteUser object.
            channelParameters.remoteAudioTrack = user.audioTrack;
            // Play the remote audio track. 
            channelParameters.remoteAudioTrack.play();
            showMessage("Remote user connected: " + user.uid);
        }
    }

    

    // Listen for the "user-unpublished" event.
    agoraEngine.on("user-unpublished", user =>
    {
      fetch(`/multi/channel_left/${options.channel}`);
      console.log(user.uid + "has left the channel");
      showMessage("Remote user has left the channel");
    });
  });


  window.onload = function ()
  {

    nonVisible(document.getElementById('easy'))
    // Listen to the Join button click event.
    document.getElementById("join").onclick = async function ()
    {  
        nonVisible(document.getElementById('lobby-section'))
        visible(document.getElementById('easy'))
        
      // receive information from server
        let response = await fetch(`/multi/channel_join/`);
        let data = await response.json();
        //change number of users and name of channel base on data
        options.channel = data.channel_name;
        options.users = data.users;
        searchTokenChannel();
        
          
    }
    
    async function joinChannel(){
      await agoraEngine.join(options.appId, options.channel, options.token, options.uid);
      //console.error(options);
      showMessage("Joined channel: " + options.channel);
      // Create a local audio track from the microphone audio.
      channelParameters.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      // Publish the local audio track in the channel.
      await agoraEngine.publish(channelParameters.localAudioTrack);
      console.log("Publish success!");
      //console.error(options.numberOfPeople);
    }


    async function searchTokenChannel(){
      //generates a token or search for one base on channel_name
      let response = await fetch(`/multi/play/${options.channel}`);
      let data = await response.json()
      //uptdate token
      options.token = data.token;
      options.uid = data.uid;
      joinChannel();
    }

    // Listen to the Leave button click event.
    document.getElementById('leave').onclick = async function ()
    {
      //asks server to update number of users
      // let response = await fetch(`/multi/channel_left/${options.channel}`);
      // let data = await response.json();
      // console.log(data);
      // Destroy the local audio track.
      channelParameters.localAudioTrack.close();
      // Leave the channel
      await agoraEngine.leave();
      console.log("You left the channel");
      // Refresh the page for reuse
      window.location.reload();
    }
  }
}

function showMessage(text){
  document.getElementById("message").textContent = text;
}
 
function nonVisible(element){
  element.style.display = "none";
}
function visible(element){
  element.style.display = "block";
}
function visible(element) {
element.style.display = "inline-block";
}
function nonVisible(element) {
element.style.display = "none";
}

startBasicCall();