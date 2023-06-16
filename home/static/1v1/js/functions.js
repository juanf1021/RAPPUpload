
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
        pauseTimer(time);
    }else{
    // update counter an run function every second
        if (count % 10 == 0){
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
        if(count % 12 === 0){
            if(videoCount % 2 == 0){
                video1.style.filter = "brightness(100%)";
                video2.style.filter = "brightness(30%)";
                name2.style.fontSize = "100px";
                name1.style.fontSize = "50px";
                //video1.style.marginLeft="20px";

            }else{
                video1.style.filter = "brightness(30%)";
                video2.style.filter = "brightness(100%)";
                name1.style.fontSize = "100px";
                name2.style.fontSize = "50px";
                //video2.style.marginRight="20px";
            }
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
    count = 120;
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


// this restart the timer and make the btn visible
function restartTimer(){
    pauseAllTimers();
    restartValues();
    musicStart();
    changeInner(seconds, "PREPÁRATE");
    isPlaying = true;
    visible(btnPlay);
    audio.currentTime = 0;
    audio.play();
    changeInner(btnPlay, "Pause");
    nonVisible(name1);
    nonVisible(name2);
}

// this reset the timer but doesnt play it
function resetTimer(){
    pauseAllTimers();
    restartValues();
    isPlaying = false;
    changeInner(btnPlay, "Play");
    changeInner(seconds, "START");
}

function musicStart(){
    var estallido = audios.options[audios.selectedIndex].id;
    estallido = parseInt(estallido);
    if (countMusic == (estallido - 5)){
        visible(damos);
        nonVisible(seconds);
    }
    if (countMusic == (estallido - 3)){
        visible(seconds);
        nonVisible(damos);
        start()
    }
    if(countMusic == ((130 + estallido)-3)){
        gritoTiempo.play();
    }
    if(countMusic == (130 + estallido)){
        audio.pause();
        changeInner(seconds, "TIEMPO!!!");
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
    }
    else{
        countMusic++;
        timeMusic = setTimeout("musicStart()", 1000);
    }
}







export {displayTime, start,playTimer, capitalize, nonVisible, visible, changeInner, pauseAllTimers, pauseTimer, restartValues, deleteDivChild, lastChildId, restartTimer, resetTimer, musicStart, playMusicStart};