import { playersArray } from "./state.js";

export function normalize(elem){
    elem.classList.remove('invalid');
    elem.nextElementSibling.classList.add('hidden');
}
export function invalidate(elem){
    elem.classList.add('invalid');
    //Could use message to update the username already exisits.
    // elem.nextElementSibling.classList.remove('hidden')
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
// export function updateTable()
// {
//    let selectPins = document.getElementById("select-pins-button");
//    selectPins.addEventListener("click", function() {
//        let playerScore = document.getElementById("chance-score").value;
//        document.getElementById("pins-hit-text").innerHTML = "Pins Hit: " + playerScore;
//        //validation goes here for select pins input
//        sanitizePinsInput();
       

//        /*Splices the chance frame bowled out from array to keep track of position in table. chanceFrame = id of each element for easier access*/
//        let chanceFrame = playersArray[activePlayer].chances[0][0]; //not sure if this is correct, but activePlayer is the index of the active player name in the playersArray
//        document.getElementById("chance" + chanceFrame).innerHTML = playerScore;
//        playersArray[activePlayer].chances[0].splice(chanceFrame,1);
//        alert(playersArray.chances);

//    });
// }
export function createNewPlayer()
{
    var userName = document.getElementById("add-user-input");

    if(!userName.value.match(/^([a-zA-Z0-9]{3,15})$/) || playersArray.includes(userName.value)){
        invalidate(userName);
        return;
    }
    playersArray.push(userName.value);
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