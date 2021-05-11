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

export function changeGameState() {
    if (gameState === 'power') {
        gameState = 'angle';
        score.power = x;
        xLimit = 86
        x = 1;
    } else if (gameState === 'angle') {
        gameState = 'end';
        score.angle = x;
        x = 1;
        let chance = calculatePins();
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

function calculatePins() {
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
        pins = 9 + getRandomInt(3);
    } else if (score.power >= 10 && score.power <= 19) {
        pins = 6 + getRandomInt(4);
    } else if (score.power >= 20 && score.power <= 69) {
        pins = 2 + getRandomInt(6);
    } else if (score.power >= 70) {
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
    // This also stops the super easy spares from the current system

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

/*Bekah's functions*/
export function normalize(elem){
    elem.classList.remove('invalid');
}
export function invalidate(elem){
    elem.classList.add('invalid');
}
export function updateTable()
{
   var score = 80;
   var chanceFrame = player.chances[0][0];

   document.getElementById("chance" + chanceFrame).innerHTML = score;
   chances[0].splice(chanceFrame, 1); //need to save for player object?
}
export function createNewPlayer()
{
    var userName = document.getElementById("add-user-input");

    if(userName.value.length > 15){
        invalidate(userName);
        return;
    }
    
    createNewPlayer(userName.value);

    var table = document.getElementById("scoreBoard");
    let clone = document.querySelector("#tbody").cloneNode(true);
    clone.setAttribute("id", userName.value);
    clone.querySelector("#playerName").innerHTML = userName.value;
    table.appendChild(clone);

}

export function deletePlayer()
{   
    if(!playersArray.includes(userName.value)){
        invalidate(userName);
        return;
    }

    var userName = document.getElementById("delete-user-input");
    //validation needed for userName input

    var user = document.getElementById(userName.value);
    user.parentNode.removeChild(user);
}