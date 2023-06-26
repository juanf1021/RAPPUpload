let iceServers = {
  iceServers: [
    { urls: "stun:stun.services.mozilla.com" },
    { urls: "stun:stun.l.google.com:19302" },
  ],
};
const our_video = document.getElementById("ours");
const remote_video = document.getElementById("remote");
const call_btn = document.getElementById("call");
let stream;
let rtcpeerconnection;
const room = document.getElementById("roomData").dataset.room;
const created = document.getElementById("roomData").dataset.created;
let isCreated;

let camera = document.getElementById("camera");
let activa = document.getElementById("activa");
let audio1 = document.getElementById("audio");
let audios = document.getElementById("audios");
let restart = document.getElementById("restart");
var timerElement = document.getElementById("seconds");
let playing = false;
let timerInterval;
let changedSrc;
let estallido = parseInt(audios.options[audios.selectedIndex].id);
let counter = 60 + estallido;
our_video.muted = true;

const ws = new WebSocket("ws://127.0.0.1:8000/ws/");
ws.onopen = () => {
  console.log("WebSocket connection opened");
  ws.send(JSON.stringify({ command: "join_room", room: room }));

  if (created === "created") {
    isCreated = true;
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((s) => {
        stream = s;
        our_video.srcObject = s;
        our_video.onloadeddata = () => {
          our_video.play();
        };
      });
  } else {
    isCreated = false;
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((s) => {
        stream = s;
        our_video.srcObject = s;
        our_video.onloadeddata = () => {
          our_video.play();
        };
        ws.send(JSON.stringify({ command: "join", room: room }));
      });
  }

  //code to gamemode
  activa.addEventListener("click", () => {
    command = !playing ? "play" : "pause";
    ws.send(JSON.stringify({ command: command, room: room }));
  });

  restart.addEventListener("click", () => {
    ws.send(JSON.stringify({ command: "restart", room: room }));
  });

  audios.addEventListener("change", (e) => {
    let audioSrc = `${e.target.value}`  
    ws.send(JSON.stringify({ command: "changeAudio", src:audioSrc, room: room }));
  });
};

ws.onmessage = (e) => {
  const data = JSON.parse(e.data);
  console.log(data);
  if (data.command === "join") {
    if (isCreated) {
      createOffer();
      call_btn.style.display = "block";
    }
  } else if (data.command === "offer") {
    if (!isCreated) {
      createAnswer(data.offer);
    }
  } else if (data.command === "answer") {
    if (isCreated) {
      rtcpeerconnection.setRemoteDescription(data.answer);
      console.log("Answer set as remote description");
    }
  } else if (data.command === "candidate") {
    if (data.iscreated !== isCreated) {
      const iceCandidate = new RTCIceCandidate(data.candidate);
      rtcpeerconnection.addIceCandidate(iceCandidate);
    }
  }
  //espacio para funcioanlidad basica
  else if (data.command === "play") {
    mainPlay();
    bothSides();
    playing = true;

  } else if (data.command === "pause") {
    mainPause();
    bothSides();
    playing = false;

  } else if (data.command === "restart") {
    mainRestart();
    playing = false;
    bothSides();
    activa.innerHTML = "Play";
    nonVisible(restart);

  } else if (data.command === "changeAudio") {
    mainRestart();
    playing = false;
    bothSides();
    activa.innerHTML = "Play";
    mainChangeAudio(data.src);
  }
};

call_btn.onclick = () => {
  createOffer();
};

function bothSides() {
  visible(restart);
  activa.innerHTML = !playing ? "Pause" : "Play";
}
function mainPlay() {
  audio1.play();
  startTimer(0);
}
function mainPause() {
  audio1.pause();
  pauseTimer(timerInterval);
}

function mainRestart() {
  counter = 60 + estallido;
  pauseTimer(timerInterval);
  timerElement.textContent = "START";
  audio1.pause();
  audio1.currentTime = 0;
}

function mainChangeAudio(src) {
  nonVisible(restart)
  audio1.src = src;
  for (var i = 0; i < audios.options.length; i++) {
    if (audios.options[i].value === src) {
      audios.selectedIndex = i;
      break;
    }
  }
}

function startTimer(stopNumber) {
  function updateTimer() {
    if (counter <= 60) {
      timerElement.textContent = counter;
    } else if (counter >= 65 && playing) {
      timerElement.textContent = "Prepárate";
    } else if (counter <= 65 && counter >= 64) {
      timerElement.textContent = "Se lo damos en...";
    } else if (counter <= 64 && counter >= 60) {
      timerElement.textContent = counter - 60;
    }
    counter--;

    // Stop the timer if it reaches the stopNumber
    if (counter < stopNumber) {
      clearInterval(timerInterval);
    }
  }

  // Start the timer
  timerInterval = setInterval(updateTimer, 1000);
}

function createOffer() {
  console.log("Offer started");
  rtcpeerconnection = new RTCPeerConnection({
    iceServers: [
      { urls: "stun:stun.services.mozilla.com" },
      { urls: "stun:stun.l.google.com:19302" },
    ],
  });
  rtcpeerconnection.onicecandidate = onIceCandidateFunc;
  rtcpeerconnection.ontrack = onTrackFunc;
  stream.getTracks().forEach((track) => {
    rtcpeerconnection.addTrack(track, stream);
  });
  rtcpeerconnection.createOffer().then((offer) => {
    rtcpeerconnection.setLocalDescription(offer);
    ws.send(JSON.stringify({ command: "offer", offer: offer, room: room }));
  });
}

function createAnswer(offer) {
  console.log("Answer started");
  rtcpeerconnection = new RTCPeerConnection({
    iceServers: [
      { urls: "stun:stun.services.mozilla.com" },
      { urls: "stun:stun.l.google.com:19302" },
    ],
  });
  rtcpeerconnection.onicecandidate = onIceCandidateFunc;
  rtcpeerconnection.ontrack = onTrackFunc;
  stream.getTracks().forEach((track) => {
    rtcpeerconnection.addTrack(track, stream);
  });
  rtcpeerconnection.setRemoteDescription(offer);
  rtcpeerconnection.createAnswer().then((answer) => {
    rtcpeerconnection.setLocalDescription(answer);
    ws.send(JSON.stringify({ command: "answer", answer: answer, room: room }));
  });
}

function onIceCandidateFunc(e) {
  console.log("IceCandidate");
  console.log(e);
  if (e.candidate) {
    ws.send(
      JSON.stringify({
        command: "candidate",
        candidate: e.candidate,
        iscreated: isCreated,
        room: room,
      })
    );
  }
}

function onTrackFunc(e) {
  remote_video.srcObject = e.streams[0];
  remote_video.onloadedmetadata = () => {
    remote_video.play();
  };
}

function nonVisible(element) {
  element.style.display = "none";
}

// this makes an element visible
function visible(element) {
  element.style.display = "inline-block";
}

function changeInner(element, text) {
  element.innerHTML = `${text}`;
}

function pauseTimer(timeValue) {
  clearInterval(timeValue);
}
