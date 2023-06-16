

// this changes the word displayed
export function showWordList(data, iterator){
    let palabra = document.getElementById("palabra");
    palabraData = data[iterator][0].word;
    palabra.innerHTML = palabraData.toUpperCase();
}

export function displayTime(count){
    seconds.innerHTML = count;
    // update the timer html
}

// this capitalize the first letter
export function capitalize(word){
    firstLetter = word.charAt(0).toUpperCase() + word.slice(1);
    return firstLetter;
}



// this makes an element not visible
export function nonVisible(element){
    element.style.display = "none";
}

// this makes an element visible
export function visible(element){
    element.style.display = "inline-block";
}

export function changeInner(element,text){
    element.innerHTML = `${text}`    
}

// //This pause all the timers
// export function pauseAllTimers(){
//     pauseTimer(time);
//     pauseTimer(timeMusic);
// }

// this pause the timer
export function pauseTimer(timeValue){
    clearTimeout(timeValue);
}

// this restart the values inside of it
export function restartValues(){
    startValue = 3;
    count = 60;
    firstClick = 0;
    countMusic = 0;
}


// this deletes all childs from a div
export function deleteDivChild(father){
    let child = father.lastChild;
    while(child){
        father.removeChild(child);
        child = father.lastElementChild;
    }
}

export function lastChildId(father){
    let child = father.lastElementChild;
    let lastChildId = child.id;
    return lastChildId
}


let countMusic = 0;
export function musicStart(){
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
    if(countMusic == ((70 + estallido)-3)){
        gritoTiempo.play();
    }
    if(countMusic == (70 + estallido)){
        audio.pause();
        changeInner(seconds, "TIEMPO!!!");
        changeInner(palabra, " ");
    }
    else{
        timeMusic = setTimeout("musicStart()", 1000);
    }
    countMusic++;
}







