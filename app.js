import { Views } from './js/views.js';
import { Scores } from './js/scores.js';
import {changeGameState, startGame, updateTable, createNewPlayer, deletePlayer, normalize,} from './js/game.js';
import {fillPlayersArray, playersArray, newGame, storeGame} from './js/state.js';



let view = new Views;
let score = new Scores;
var game;

//starts a new game based on the players created
document.querySelector('#start-game-button').addEventListener('click', function(){
    game =  newGame(playersArray);
});

document.querySelector('#select-pins-button').addEventListener('click', function(){
    let pinsSelector =  document.getElementById('chance-score');
    let activePlayer = game.turns.shift();
    game.players[activePlayer].chances.push(pinsSelector.value);
    let frames = score.getFrameScore(game.players[activePlayer].chances);
    let framesTotals = score.framesTotals(frames);
    view.updateView(game.players[activePlayer].chances, framesTotals)
    game.turns.push(activePlayer)

    
    console.log(game.turns)


});


// let game = new Game;

//Dummy Data Chances
// const chances = [1,5,0,10,10,10,10,0,6,5,2,10,2,7];
// const chances = [10,10,10,10,10,10,10,10,10,10,10,10];

// let frames = score.getFrameScore(chances);
// let framesTotals = score.framesTotals(frames);

//Game
let pins;

/*Commented out to use input instead*/
//startGame()
// updateTable()

let addUser = document.querySelector('#add-user-input');
let deleteUser = document.querySelector('#delete-user-input');
let endGame = document.querySelector('#end-game-button');

/*Commented this out as it was caused errors, not sure what is going on here*/
//addUser.addEventListener('click', normalize(addUser)); 
//deleteUser.addEventListener('click', normalize(deleteUser));
//endGame.addEventListener('click', storeGame(game));

document.getElementById("add-user-button").addEventListener("click", createNewPlayer);
document.querySelector('#add-user-button').addEventListener('click', fillPlayersArray);
var tes;


console.log(game)

document.getElementById("delete-user-button").addEventListener("click", deletePlayer);



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
