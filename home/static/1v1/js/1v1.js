


// this is the initial value of the counter
let count = 120;
let time;
let tiempo;
let isPlaying = false;
let startValue = 3;
let countMusic = 0;
let timeMusic;
let firstClick = 0;
let iterator = 0;
let datos;
let elementP;
let textWord;
let notDefined = false;
let actVolume;
var firstApiWorked;
let idCounter = 1;
let videoCount = 0;
// these are some elements
let seconds = document.getElementById("seconds");
let btnPlay = document.getElementById("play");
let btnRestart = document.getElementById("restart");
btnRestart.style.display = "none";
let audio = document.getElementById("audio");
let gritoTiempo = document.getElementById("grito01");
let wordContainerHtml = document.getElementById("wordContainerHtml");
let ir = document.getElementById("ir");
let volver = document.getElementById("volver");
let damos = document.getElementById("damos");
let playRecorder = document.getElementById("play-recorder");

let video1 = document.getElementById("video1");
let video2 = document.getElementById("video2");

let name1 = document.getElementById("name1");
let name2 = document.getElementById("name2");
const names = [name1, name2]; 

let game = document.getElementById("1v1");
let send = document.getElementById("send");
let nombres = document.getElementById("nombres");
var duration = [];


        
var element = document.querySelector('.name');

// Get the computed style of the element
var computedStyle = window.getComputedStyle(element);

// Retrieve the font size value
const fontSize = parseInt(computedStyle.fontSize, 10);


document.addEventListener("DOMContentLoaded", ()=>{
    nonVisible(ir,volver,damos,playRecorder,name1,name2,game);
    // the start duration from firstbeat converten into an array with separateString()
    duration = separateString(audio.dataset.duration);
    let audios = document.getElementById("audios");
    // this checks if there is a change on the audio Selection, if that happens
    // it changes the src in html
    audios.addEventListener('change', (evento) => {
        // takes the duration of the beat to change and makes it an array wit scnd and mlscnds
        elemento = evento.target.options[evento.target.selectedIndex].dataset.duration;
        duration = separateString(elemento);
        clearInterval(intervalId);
        restartValues();
        nonVisible(ir,volver,btnRestart,name1,name2);
        audio = document.getElementById("audio");
        let beat = evento.target.value;
        audio.src = `${beat}`;
        resetTimer();
        visible(btnPlay);
        deleteDivChild(wordContainerHtml);
    });

    btnPlay.addEventListener("click", ()=>{
    // when play bnt is clicked, checks if isPlaying is false and the play timer function start
    // if is playing is true and the bnt is clicked, the timer stop
    var estallido = audios.options[audios.selectedIndex].id;
        firstClick++;
        if(!isPlaying){
            audio.play();
            // if its the first click then change second for text
            if (firstClick >= 1){
                visible(btnRestart);
            }
            if(firstClick == 1){
                changeInner(seconds, "PREPÁRATE");
                seconds.className = 'preparate'
            }else{
// this avoids changing the counter too fast whe btn is clicked many times
                count++;
                countMusic--;
                currentTime -= 1000;
                //!!add  the same for the other timer
            }
    // this check if the program is in the 3 scnds timer
            if(startValue > 0 && startValue < 3){
                start();
                playMusicStart();
                isPlaying = true;
                changeInner(btnPlay, "Pause");
                startValue++;
            }
            else if(countMusic < (estallido - 3)){
                musicStart();
            }
            else{
                playMusicStart();
                playTimer();
                startTimer(duration);
            }
            isPlaying = true;
            changeInner(btnPlay, "Pause");
        }else{
            isPlaying = false;
            changeInner(btnPlay, "Play");
            audio.pause();
            pauseAllTimers();
        }
    }
)
    // this restart everythin when that btn is clicked
    let btnRestart= document.getElementById("restart");
    btnRestart.addEventListener("click", ()=>{
            restartTimer();
            nonVisible(ir);
            changeInner(btnPlay, "Pause");
            deleteDivChild(wordContainerHtml);
    })
    let volumeIcon = document.getElementById("volume-icon");
    let volume = document.getElementById("volume");
    volume.addEventListener('change', (evento) => {
        actVolume = evento.target.value;
        audio.volume = (actVolume / 100);
        gritoTiempo.volume = (actVolume / 100);
        if (audio.volume > 0.3){
            volumeIcon.className = "fa-solid fa-volume-high";
        }
        if (audio.volume < 0.3){
            volumeIcon.className = "fa-solid fa-volume-low";
        }
        if(audio.volume === 0.0){
            volumeIcon.className = "fa-solid fa-volume-xmark";
        }

    })
    
    volumeIcon.addEventListener("mouseover", ()=> {
        visible(volume);
    })

    volume.addEventListener("mouseout", ()=> {
        nonVisible(volume);
    })

    ir.addEventListener("click", ()=> {
        let lastChild = lastChildId(wordContainerHtml);
        ir.href = `#${lastChild}`
    });



    nombres.addEventListener("keydown",(event)=>{
        if(event.key == "Enter"){
            event.preventDefault();
            const index = [...nombres].indexOf(event.target);
            if(index == nombres.elements.length - 2) { // check if current element is the last input
                changeGame(nombres, names);
            } else {
                nombres.elements[index + 1].focus(); // focus on the next input element
            }
    }
});

    // this happens when the send btn for asking names is clicked
    send.addEventListener("click",()=>{
        // nombres for taking the elements of ther Form
        // names is a list with the player names
        changeGame(nombres, names);
        
    });
});




function displayTime(count){
    seconds.innerHTML = count;
    // update the timer html
}

// this start the 3 scds counter and then start the 60 scnds timer
function start(){
    count = 120;
    displayTime(startValue);
    if (startValue == 0){
        playTimer();
        startTimer(duration);
        seconds.className = 'seconds'
    }else{
            startValue--;
            time = setTimeout("start()", 1000);
        }
}

function playTimer(){
    // this update the html of the counter
    displayTime(count);
    // if counter 0 then stop and make playbtn not visible
    if (count == 0){
        nonVisible(btnPlay,name1,name2);
        changeInner(seconds, "ÚLTIMA!!!");
        seconds.className = 'ultima'
        pauseTimer(time);
    }else{
    // update counter an run function every second
        if (count % 10 === 0){
            visible(name1);
            visible(name2);
            // !!Check if this is important
            if(firstApiWorked){
                notDefined = isUndefined(datos, iterator);
            }
            while(notDefined){
                iterator++;
                notDefined = isUndefined(datos,iterator);
            }
            videoCount++;
        }

        iterator++;
        count--;
        time = setTimeout("playTimer()", 1000);

    }
}

// this capitalize the first letter
function capitalize(word){
    firstLetter = word.charAt(0).toUpperCase() + word.slice(1);
    return firstLetter;
}

// this makes an element not visible
function nonVisible(){
    for(let i = 0; i < arguments.length; i++){
        arguments[i].style.display = "none";
    }
}

// this makes an element visible
function visible(element){
    element.style.display = "inline-block";
}

function changeInner(element,text){
    element.innerHTML = `${text}`    
}

//This pause all the timers
function pauseAllTimers(){
    pauseTimer(time);
    pauseTimer(timeMusic);
    clearInterval(intervalId);
}

// this pause the timer
function pauseTimer(timeValue){
    clearTimeout(timeValue);
}

// this restart the values inside of it
function restartValues(){
    startValue = 3;
    count = 120;
    firstClick = 0;
    countMusic = 0;
    totalTime = 120; // 120 seconds
    currentTime = 0;
    intervalId = null;
    contador = 0;
}


// this deletes all childs from a div
function deleteDivChild(father){
    let child = father.lastChild;
    while(child){
        father.removeChild(child);
        child = father.lastElementChild;
    }
}

function lastChildId(father){
    let child = father.lastElementChild;
    let lastChildId = child.id;
    return lastChildId
}


// this restart the timer and make the btn visible
function restartTimer(){
    pauseAllTimers();
    restartValues();
    musicStart();
    changeInner(seconds, "PREPÁRATE");
    seconds.className = 'preparate'
    isPlaying = true;
    visible(btnPlay);
    audio.currentTime = 0;
    audio.play();
    changeInner(btnPlay, "Pause");
    nonVisible(name1,name2);
}

// this reset the timer but doesnt play it
function resetTimer(){
    pauseAllTimers();
    restartValues();
    isPlaying = false;
    changeInner(btnPlay, "Play");
    changeInner(seconds, "START");
    seconds.className = 'start';
}

function musicStart(){
    var estallido = audios.options[audios.selectedIndex].id;
    estallido = parseInt(estallido);
    if (countMusic == (estallido - 5)){
        changeInner(seconds, "SE LO DAMOS EN...");
        seconds.className = "damos";
    }
    if (countMusic == (estallido - 3)){
        start()
        seconds.className = 'seconds'
    }
    if(countMusic == ((130 + estallido)-3)){
        gritoTiempo.play();
    }
    if(countMusic == (130 + estallido)){
        audio.pause();
        changeInner(seconds, "TIEMPO!!!");
        seconds.className = 'tiempo'
    }
    else{
        timeMusic = setTimeout("musicStart()", 1000);
    }
    countMusic++;
}

function playMusicStart(){
    var estallido = audios.options[audios.selectedIndex].id;
    estallido = parseInt(estallido);
    if(countMusic == (130 + estallido)){
        audio.pause();
        changeInner(seconds, "TIEMPO!!!");
        seconds.className = 'tiempo'
    }
    else{
        countMusic++;
        timeMusic = setTimeout("musicStart()", 1000);
    }
}


function validateNames(names){
    for(let i=0; i<2; i++ ){
        if((names.elements[i].value.length) > 6){
            names.elements[i].style.color ="red";
            return false
        }else{
            return true
        };      
    }
    
}

function changeGame(nombres,names){
        // this is a second step verification for checking 
        // the lenght of names are not bigger than 8
        // if everything's all right then hide the name section and show the 1v1 mode
    if(validateNames(nombres)){
        nonVisible(info);
        game.style.display = "block";
        for(let i=0; i<2; i++){
            // this checks if whe deleting all blank spaces you have a blanks space instead of a string then replace the name of the playe to MC 1
            if((nombres.elements[i].value).replace(/\s/g, '')===''){
                changeInner(names[i], `MC ${i+1}`);
            }else{
                changeInner(names[i], (nombres.elements[i].value).toUpperCase());
            }; 
        }}
    else{
        console.log("Error");
    };
}



let totalTime = 120; // 120 seconds
let currentTime = 0;
let intervalId = null;
let contador = 0;

function startTimer(duration) {
  intervalId = setInterval(function() {
    currentTime += 10; // increase by 10 milliseconds
    let seconds = Math.floor(currentTime / 1000);
    let milliseconds = currentTime % 1000;
    let time = [seconds, milliseconds];
    //console.log(time[0] + ":" + time[1]);
    if (currentTime >= totalTime * 1000) {
      clearInterval(intervalId);
    }
    // this checks if the time where the beat changes its right with the counter so it can change the color and size of 1v1
    // duratio[0] are the second of the change in beat from database and duration[1] are milliseconds while time[i] its the time from counter
    if((time[0] === (duration[0] * contador) && time[1]>= duration[1])||(time[0] === 0 && time[1]<= 10)){


        if(videoCount % 2 == 0){
            video1.style.filter = "brightness(100%)";
            video2.style.filter = "brightness(30%)";
            name2.style.fontSize = `${fontSize*2}px`;
            name1.style.fontSize = `${fontSize}px`;
            //video1.style.marginLeft="20px";

        }else{
            video1.style.filter = "brightness(30%)";
            video2.style.filter = "brightness(100%)";
            name1.style.fontSize =`${fontSize*2}px`;
            name2.style.fontSize = `${fontSize}px`;
            //video2.style.marginRight="20px";
        }
        contador++;
        
    }
    if(time[0] == 22 && time[1] == 470){
        console.log(duration[1]);
        duration[1]-= 1000;
        console.log(duration[1]);
        // currentTime += 300;
        // console.log(time[0] + ":" + time[1]);
        // console.log("axelini");
    }
  }, 10); // update every 10 milliseconds
}


// this function takes an string as an argument and divides taking a . as a reference then puts both parts into diferent indexes of a list, return the list
function separateString(string){
    let duration = []
    let seconds = "";
    let milliseconds = "";
    for(i=0; i<string.length; i++){
        if(string[i] === '.'){
            for(j=0; j<i; j++){
                seconds += string[j];
            };
            for(j=i+1; j<string.length; j++){
                milliseconds += string[j];
            };
        };
    };
    duration[0]= parseInt(seconds);
    duration[1] = parseInt(milliseconds);
    return duration;
}









// this part is fully about the audio recorder


document.addEventListener("DOMContentLoaded", ()=>{
    jQuery(document).ready(function () {
        var $ = jQuery;
        var myRecorder = {
            objects: {
                context: null,
                stream: null,
                recorder: null
            },
            init: function () {
                if (null === myRecorder.objects.context) {
                    myRecorder.objects.context = new (
                            window.AudioContext || window.webkitAudioContext
                            );
                }
            },
            start: function () {
                var options = {audio: true, video: false};
                navigator.mediaDevices.getUserMedia(options).then(function (stream) {
                    myRecorder.objects.stream = stream;
                    myRecorder.objects.recorder = new Recorder(
                            myRecorder.objects.context.createMediaStreamSource(stream),
                            {numChannels: 1}
                    );
                    myRecorder.objects.recorder.record();
                }).catch(function (err) {});
            },
            stop: function (listObject) {
                if (null !== myRecorder.objects.stream) {
                    myRecorder.objects.stream.getAudioTracks()[0].stop();
                }
                if (null !== myRecorder.objects.recorder) {
                    myRecorder.objects.recorder.stop();
    
                    // Validate object
                    if (null !== listObject
                            && 'object' === typeof listObject
                            && listObject.length > 0) {
                        // Export the WAV file
                        myRecorder.objects.recorder.exportWAV(function (blob) {
                            var url = (window.URL || window.webkitURL)
                                    .createObjectURL(blob);
    
                            // Prepare the playback
                            var audioObject = $('<audio controls></audio>')
                                    .attr('src', url)
                                    .attr('id', `recorder-${idCounter}`);
    
                            // Prepare the download link
                            var downloadObject = $('<a class="download"><i class="fa-solid fa-download" ></i></a>')
                                    .attr('href', url)
                                    .attr('id', `download-${idCounter}`)
                                    .attr('download', new Date().toUTCString() + '.wav');
    
                            // Wrap everything in a row
                            var holderObject = $('<div class="row"></div>')
                                    .append(audioObject)
                                    .append(downloadObject);
    
                            // Append to the list
                            listObject.append(holderObject);
                        });
                    }
                }
            }
        };
    
        // Prepare the recordings list
        var listObject = $('[data-role="recordings"]');
    
        // Prepare the record button
        $('[data-role="controls"] > button').click(function () {
            // Initialize the recorder
            myRecorder.init();
    
            // Get the button state 
            var buttonState = !!$(this).attr('data-recording');
    
            // Toggle
            if (!buttonState) {
                $(this).attr('data-recording', 'true');
                myRecorder.start();
            } else {
                $(this).attr('data-recording', '');
                myRecorder.stop(listObject);
                $('.download').css({
                    'display': 'none',
                    'margin' : '0px',
                    'padding' : '0px'
                });
                $('.row').css({
                    'padding' : '0px'
                });
                visible(playRecorder);
                let isPlayingDownload = false;
                $("#play-recorder").click(()=>{
                    var testAudio = document.getElementById(`recorder-${idCounter}`);
                    testAudio.addEventListener("ended", function() 
                    {
                    isPlayingDownload = false;
                    });
                    if(isPlayingDownload === true){
                        testAudio.pause();
                        isPlayingDownload = false;
                    }else{
                        isPlayingDownload = true;
                        testAudio.play();
                    }
                });
                idCounter = idCounter + 1;
            }     
            volume.addEventListener('change', (evento) => {
                var testAudio = document.getElementById(`recorder-${idCounter}`);
                actVolume = evento.target.value;
                testAudio.volume = (actVolume / 100);      
            });
            
        });
    });
});

