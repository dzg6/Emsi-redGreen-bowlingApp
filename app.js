import { Views } from './js/views.js';
import { Scores } from './js/scores.js';
import { changeGameState, startGame, updateTable, createNewPlayer, deletePlayer, normalize, } from './js/game.js';
import { fillPlayersArray, playersArray, newGame, storeGame } from './js/state.js';



let view = new Views;
let score = new Scores;
var game;

//starts a new game based on the players created
document.querySelector('#start-game-button').addEventListener('click', function () {
    game = newGame(playersArray);
});



//PINS MANAGEMENT

let pinsHit;
//Hard Pin Selector
document.querySelector('#select-pins-button').addEventListener('click', function () {
    let pinsHit = document.getElementById('chance-score').value;
    updateScore(pinsHit)
    pinsHit = null;

});
//Game Selector
document.addEventListener('keydown', function (event) {
    if (event.key === ' ') {
        pinsHit = changeGameState(game.pinsRemaining);
    }
    if (pinsHit || pinsHit == 0) {
        updateScore(pinsHit)
        pinsHit = null;
    }
});

function updateScore(pins) {
    console.log(game)
    game.players[game.activePlayer].chances.push(Number(pins));
    let frames = score.getFrameScore(game.players[game.activePlayer].chances);
    let framesTotals = score.framesTotals(frames);
    view.updateView(game.activePlayer, game.players[game.activePlayer].chances, framesTotals)
    frameManagement(game, pins);

}

function frameManagement(game, pins) {
    console.log ('pins hit: ' + pins)

    if (pins == 10) {
        game.frameChances = 1;
        game.turns.push(game.activePlayer);
        game.activePlayer = game.turns.shift();
        game.pinsRemaining = 10;
    } else if (game.frameChances >= 2) {
        game.frameChances = 1;
        game.turns.push(game.activePlayer);
        game.activePlayer = game.turns.shift();
        game.pinsRemaining = 10;
    } else {
        game.frameChances++;
        game.pinsRemaining = game.pinsRemaining - pins;

    }

}



/*Commented out to use input instead*/
startGame()
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



document.getElementById("delete-user-button").addEventListener("click", deletePlayer);



