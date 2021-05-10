import { Views } from './js/views.js';
import { Scores } from './js/scores.js';
import { changeGameState, startGame, updateTable, createNewPlayer, deletePlayer } from './js/game.js';



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

document.getElementById("add-user-button").addEventListener("click", createNewPlayer()); //this may not be working as intended due to the document already having an event listener?
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


