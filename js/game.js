import { playersArray } from "./state.js";

var x = 1;
var xState = true;
var gameState = 'power';
var powerCursor = document.getElementById('powerCursor');
var angleCursor = document.getElementById('angleCursor');
var score = {
    power: null,
    angle: null
}
var xLimit = 93;
var percentage = '0%';
var easy;
var medium;
var hard;

export function changeGameState(pinsRemaining) {
    if (gameState === 'power') {
        gameState = 'angle';
        score.power = x;
        xLimit = 86
        x = 1;
    } else if (gameState === 'angle') {
        gameState = 'end';
        score.angle = x;
        x = 1;
        let chance = calculatePins(pinsRemaining);
        return chance
    } else if (gameState === 'end') {
        gameState = 'power';
        xLimit = 93;
        startGame()
    }
}


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function calculatePins(pinsRemaining) {
    let pins = 0;
    /*  Note: power had to flip due to x translating top
    *  if power is within 95-100 = 'pin gain is 10,  perfect'
    *  if power is within in 90-95 "pin gain = 8-10"
    *  if power is within in 70-89 "pin gain = 6-9"
    *  if power is within in 20-69 "pin gain = 2-7"
    *  if power is within in 0-19 "pin gain = 0-4"
    */

    if (score.power <= 5) {
        pins = 10;
    } else if (score.power >= 5 && score.power <= 10) {
        pins = 8 + getRandomInt(3);
    } else if (score.power >= 10 && score.power <= 19) {
        pins = 6 + getRandomInt(4);
    } else if (score.power >= 20 && score.power <= 89) {
        pins = 2 + getRandomInt(6);
    } else if (score.power >= 90) {
        pins = getRandomInt(5);
    }



    /* if angle is within 48-53 = 'pin loss is 0, perfect'
    *  if angle is within in 40-48 || 54-64= "pin loss = 0-3"
    *  if angle is within in 20-40 || 64-80= "pin loss = 4-8"
    *  if angle is within in 10-20 = "pin loss = 9-10"
    *  if angle is within in 0-10 = "pin loss = 10"
    */
    if (score.angle >= 45 && score.angle <= 55) {
        pins = pins;
    } else if (score.angle > 40 && score.angle < 45 || score.angle > 55 && score.angle < 64) {
        pins = pins - getRandomInt(4);
    } else if (score.angle > 20 && score.angle < 40 || score.angle > 64 && score.angle < 80) {
        pins = pins - (4 + getRandomInt(5));
    } else if (score.angle > 10 && score.angle < 20 || score.angle > 80 && score.angle < 90) {
        pins = pins - (9 + getRandomInt(2));
    } else if (score.angle < 10 || score.angle > 90) {
        pins = pins * 0;
    }
    if (pins < 0) {
        pins = Math.abs(pins * 0);
    }

    //TO ADD when we are bowling by frames
    // pins * 10 to get thje percentage hit. 
    // Now you knock down the percentage of pins left standing to avoid breaking 10
    if(pinsRemaining != 10 ){
        // console.log('pinsR:')
        // console.log(pinsRemaining)
        // console.log(pins * .1)
        // console.log(( pinsRemaining * (pins * .1) ))
        // console.log((pinsRemaining / (pins * 10)));
        let testPins = pinsRemaining * (pins * .1);
        console.log(testPins)
        if(testPins == 0) {
            pins = 0;
        }else{   pins = Math.floor(pinsRemaining * (pins * .1));
    }
}
    console.log(pins)

    return pins

}


export function startGame(difficulty) {
    easy = setInterval(powerCursorAnimation, .1)
    medium = setInterval(powerCursorAnimation, 1)
    hard = setInterval(powerCursorAnimation, .5)

}

function powerCursorAnimation() {


    if (gameState == 'end') {
        clearInterval(easy)
        clearInterval(medium)
        clearInterval(hard)
    } else {
        percentage = x + '%';
        if (gameState === 'power') {
            powerCursor.style.top = percentage;
        } else {
            angleCursor.style.left = percentage;
        }



        if (x > xLimit) {
            xState = false;
        } else if (x < 0) {
            xState = true;
        }
        xState ? x++ : x--;

    }
}

export function normalize(elem){
    elem.classList.remove('invalid');
    elem.nextElementSibling.classList.add('hidden');
}
export function invalidate(elem){
    elem.classList.add('invalid');
    elem.nextElementSibling.classList.remove('hidden')
}
let pinsError = document.querySelector('#pins-error');
export function normalizePinsInput(){
    pinsInput.classList.remove('invalid');
    pinsError.classList.add('hidden');
}
export function invalidatePinsInput(){
    pinsInput.classList.add('invalid');
    pinsError.classList.remove('hidden');
}

/*Bekah's functions*/
export let pinsInput = document.querySelector('#chance-score');
let total = 10;
let chances = 2;
export function updateTable()
{
   let selectPins = document.getElementById("select-pins-button");
   selectPins.addEventListener("click", function() {
       let playerScore = document.getElementById("chance-score").value;
       document.getElementById("pins-hit-text").innerHTML = "Pins Hit: " + playerScore;
       //validation goes here for select pins input
       sanitizePinsInput();
       

       /*Splices the chance frame bowled out from array to keep track of position in table. chanceFrame = id of each element for easier access*/
       let chanceFrame = playersArray[activePlayer].chances[0][0]; //not sure if this is correct, but activePlayer is the index of the active player name in the playersArray
       document.getElementById("chance" + chanceFrame).innerHTML = playerScore;
       playersArray[activePlayer].chances[0].splice(chanceFrame,1);
       alert(playersArray.chances);

   });
}
export function createNewPlayer()
{
    var userName = document.getElementById("add-user-input");

    if(!userName.value.match(/^([a-zA-Z0-9]{3,15})$/) || playersArray.includes(userName.value)){
        invalidate(userName);
        return;
    }
    // playersArray.push(userName.value);
    var table = document.getElementById("scoreBoard");
    let clone = document.querySelector("#tbody").cloneNode(true);
    clone.setAttribute("id", userName.value);
    clone.classList.remove("hide");
    clone.querySelector("#playerName").innerHTML = userName.value;
    table.appendChild(clone);

}

export function deletePlayer()
{   
    var userName = document.getElementById("delete-user-input");
    //validation needed for userName input
    
    if(!playersArray.includes(userName.value)){
        invalidate(userName);
        return;
    }
    var user = document.getElementById(userName.value);
    let arrayPosition = playersArray.findIndex(element => element === userName.value)
    playersArray.splice(arrayPosition, arrayPosition)
    user.parentNode.removeChild(user);
}

function sanitizePinsInput(){
    if(total == 0 || chances == 0){
        total =10;
        chances=2;
    }
    if(pinsInput.value > total || pinsInput.value < 0){
        invalidatePinsInput();
        return;
    }
    else{
        total -= pinsInput.value;
        chances -= 1;
    }
}

function loadGame(number){
    let loadedGame = JSON.parse(localStorage.getItem(`savedGame${number}`));
    return loadedGame;
}