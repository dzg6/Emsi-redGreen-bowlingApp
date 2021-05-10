import { Views } from './js/views.js';
import { Scores } from './js/scores.js';
import {changeGameState, startGame, updateTable, createNewPlayer, deletePlayer, normalize,} from './js/game.js';
import {fillPlayersArray, playersArray, newGame, playersArray} from './js/state';



let view = new Views;
let score = new Scores;
// let game = new Game;

//Dummy Data Chances
const chances = [1,5,0,10,10,10,10,0,6,5,2,10,2,7];
// const chances = [10,10,10,10,10,10,10,10,10,10,10,10];

let frames = score.getFrameScore(chances);
let framesTotals = score.framesTotals(frames);





//Game
let pins;

startGame()
updateTable()

let addUser = document.querySelector('#add-user-input');
let deleteUser = document.querySelector('#delete-user-input');

addUser.addEventListener('click', normalize(addUser));
deleteUser.addEventListener('click', normalize(deleteUser));

document.getElementById("add-user-button").addEventListener("click", createNewPlayer()); //this may not be working as intended due to the document already having an event listener?
document.querySelector('#add-user-button').addEventListener('click', fillPlayersArray());
document.querySelector('#start-game-button').addEventListener('click', newGame(playersArray));
document.getElementById("delete-user-button").addEventListener("click", deletePlayer()); //same issue as above


document.addEventListener('keydown', function (event) {
    if (event.key === ' ') {
     pins = changeGameState();
}
if(pins){
document.getElementById('pinsHit').innerText = pins;
pins = null;
}
});

 view.updateView(chances, framesTotals)
