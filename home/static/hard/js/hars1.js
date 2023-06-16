// this is the initial value of the counter
let count = 60;
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
let definitionElement;
let actVolume;
let wordObject;
let wordDefinition;
let palabraData;
var firstApiWorked;
let idCounter = 1;
// these are some elements
let seconds = document.getElementById("seconds");
let btnPlay = document.getElementById("play");
let btnRestart = document.getElementById("restart");
btnRestart.style.display = "none";
let audio = document.getElementById("audio");
let gritoTiempo = document.getElementById("grito01");
let palabra = document.getElementById("palabra");
let wordContainerHtml = document.getElementById("wordContainerHtml");
let ir = document.getElementById("ir");
let volver = document.getElementById("volver");
let playRecorder = document.getElementById("play-recorder");


window.onload = async function ()
{
    let response = await fetch(`/play/data`);
    datos = await response.json();
    console.error(" ka;jsdlokajsdlokasd");
}
document.addEventListener("DOMContentLoaded", ()=>{
    nonVisible(ir);
    nonVisible(volver);
    nonVisible(playRecorder);
    let audios = document.getElementById("audios");
    // this check if there is a change on the audio Selection, if that happens
    // it changes the src in html
    audios.addEventListener('change', (evento) => {
        restartValues();
        nonVisible(ir);
        nonVisible(volver);
        audio = document.getElementById("audio");
        let beat = evento.target.value;
        audio.src = `${beat}`;
        resetTimer();
        changeInner(palabra," ");
        nonVisible(btnRestart);
        visible(btnPlay);
        deleteDivChild(wordContainerHtml);
    })

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
                seconds.className = "preparate";
                changeInner(palabra, " ");
            }else{
// this avoids changing the counter too fast whe btn is clicked many times
                count++;
                countMusic--;
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
            changeInner(palabra, " ");
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
    })


})

// this functions shows the description of used words
function usedWords(data, iterator){
        let wordContainer = document.createElement("div");
        wordContainer.className = "full-word";
        wordContainer.id = `wordContainer${iterator}`;
        let wordElement = document.createElement("h6");
        wordElement.className = "word-element";
        definitionElement = document.createElement("p");
        definitionElement.className = "definition-element";
        wordObject = data[iterator][0].word;
        let wordObjectCapitalized = capitalize(wordObject);
        wordDefinition = data[iterator][0].definition;
        let cleanedDefinition = cleanDefinition(wordDefinition);
        if (typeof cleanedDefinition === 'undefined'){
            cleanedDefinition = wordDefinition;
        }
        let textDefinition = document.createTextNode(`${cleanedDefinition}`);
        let textWord = document.createTextNode(`${wordObjectCapitalized}:`);
        wordElement.appendChild(textWord);
        definitionElement.innerHTML = cleanedDefinition;
        wordContainerHtml.appendChild(wordContainer);
        wordContainer.appendChild(wordElement);
        wordContainer.appendChild(definitionElement);
}

// this function clean the description received from api in order to make it shorter
function cleanDefinition(definition){
    let index = definition.indexOf(":");
    if(index == -1){
        let index = definition.indexOf(".");
        index++;
        for(index; index < definition.length; index ++){
            if(definition.charAt(index) == "."){
               let cleanedDefinition = definition.slice(0, index + 1);
               return cleanedDefinition;
            }
        }
    }
    else if(typeof definition === 'undefined'){
        let cleanedDefinition = "Sorry, something happened";
        return cleanedDefinition
    }else{
        for(index; index < definition.length; index ++){
            if(definition.charAt(index) == "."){
               let cleanedDefinition = definition.slice(0, index + 1);
               return cleanedDefinition;
            }
        }
    }
}


function displayTime(count){
    seconds.innerHTML = count;
    seconds.className = "seconds";
    // update the timer html
}

// this start the 3 scds counter and then start the 60 scnds timer
function start(){
    count = 60;
    displayTime(startValue);
    if (startValue == 0){
        playTimer();
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
        nonVisible(btnPlay);
        changeInner(seconds, "ÚLTIMA!!!");
        seconds.className = "ultima";
        pauseTimer(time);
    }else{
    // update counter an run function every second
        if (count % 5 == 0){
            visible(ir);
            visible(volver);
            usedWords(datos, iterator);
            showWordList(datos, iterator);
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
function nonVisible(element){
    element.style.display = "none";
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
}

// this pause the timer
function pauseTimer(timeValue){
    clearTimeout(timeValue);
}

// this restart the values inside of it
function restartValues(){
    startValue = 3;
    count = 60;
    firstClick = 0;
    countMusic = 0;
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

function showWordList(data, iterator){
    let palabra = document.getElementById("palabra");
    palabraData = data[iterator][0].word;
    palabra.innerHTML = palabraData.toUpperCase();
}

// this restart the timer and make the btn visible
function restartTimer(){
    pauseAllTimers();
    restartValues();
    musicStart();
    changeInner(seconds, "PREPÁRATE");
    seconds.className = "preparate";
    changeInner(palabra, " ");
    isPlaying = true;
    visible(btnPlay);
    audio.currentTime = 0;
    audio.play();
    changeInner(btnPlay, "Pause");
}

// this reset the timer but doesnt play it
function resetTimer(){
    pauseAllTimers();
    restartValues();
    isPlaying = false;
    changeInner(btnPlay, "Play");
    changeInner(palabra, " ");
    changeInner(seconds, "START");
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
    if(countMusic == ((70 + estallido)-3)){
        gritoTiempo.play();
    }
    if(countMusic == (70 + estallido)){
        audio.pause();
        changeInner(seconds, "TIEMPO!!!");
        seconds.className = "tiempo";
        changeInner(palabra, " ");
    }
    else{
        timeMusic = setTimeout("musicStart()", 1000);
    }
    countMusic++;
}


function playMusicStart(){
    var estallido = audios.options[audios.selectedIndex].id;
    estallido = parseInt(estallido);
    if(countMusic == (70 + estallido)){
        audio.pause();
        changeInner(seconds, "TIEMPO!!!");
        changeInner(palabra, " ");
    }
    else{
        countMusic++;
        timeMusic = setTimeout("musicStart()", 1000);
    }
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

