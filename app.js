import { Views } from './js/views.js';
import { Scores } from './js/scores.js';
import { changeGameState, startGame } from './js/game.js';
import { createNewPlayer, deletePlayer, normalize, } from './js/inputs.js';
import { playersArray, newGame, storeGame } from './js/state.js';
import { Frame } from './js/frames.js';



let view = new Views;
let score = new Scores;
let frameManager = new Frame;
var game;

let pinsHit;


//Intro page to creating and deleting players
document.getElementById("add-user-button").addEventListener("click", createNewPlayer);
document.getElementById("delete-user-button").addEventListener("click", deletePlayer);




//starts a new game based on the players created
document.querySelector('#start-game-button').addEventListener('click', function () {
    game = newGame(playersArray);
    document.getElementById("activePlayer").innerHTML = game.activePlayer;

    //Tests for single player vs multiple players
    if(game.turns > 0){
    frameManager.playerKey = game.turns[game.turns.length - 1];
    }else{
        frameManager.playerKey = game.activePlayer;
    }
});



//PINS MANAGEMENT


//Hard Pin Selector
document.querySelector('#select-pins-button').addEventListener('click', function () {
    pinsHit = document.getElementById('chance-score').value;
    if(game.pinsRemaining >= pinsHit){
    updateScore(pinsHit)
    pinsHit = null;
    }

});
//Game Selector
document.addEventListener('keydown', function (event) {
    if (event.key === 'x') {
        pinsHit = changeGameState(game.pinsRemaining);
    }
    if (pinsHit || pinsHit == 0) {
        updateScore(pinsHit)
        pinsHit = null;
    }
});

function updateScore(pins) {
    if(game.activePlayer){
    game.players[game.activePlayer].chances.push(Number(pins));
    updatePins(pins);
    
    let frameScores = score.getFrameScore(game.players[game.activePlayer].chances, frameManager.lastFrame);
    let frameTotals = score.framesTotals(frameScores);
    view.updateView(game.activePlayer, game.players[game.activePlayer].chances, frameTotals)

    frameManager.frameManagement(game, pins);
    document.getElementById('chance-score').setAttribute('max', game.pinsRemaining)
    }else{
        document.getElementById("activePlayer").innerHTML = 'GAME OVER';
    }
    

}

function updatePins(pins){
    if(pins == 10){
    document.getElementById("pins-hit-text").innerHTML =  'Strike!!!';
    }else if (pins == game.pinsRemaining){

        document.getElementById("pins-hit-text").innerHTML =  "Spare!";
    }else{
        document.getElementById("pins-hit-text").innerHTML =  pins;
    }
}


//Starts the bopwling game
startGame()



/*Commented out to use input instead*/
//  updateTable()

// let addUser = document.querySelector('#add-user-input');
// let deleteUser = document.querySelector('#delete-user-input');
// let endGame = document.querySelector('#end-game-button');

/*Commented this out as it was caused errors, not sure what is going on here*/
//addUser.addEventListener('click', normalize(addUser)); 
//deleteUser.addEventListener('click', normalize(deleteUser));
//endGame.addEventListener('click', storeGame(game));




