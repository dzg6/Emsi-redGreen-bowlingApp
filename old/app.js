import { Views } from './js/views.js';
import { Scores } from './js/scores.js';
import { prediction } from './js/predictable.js';
import { changeGameState, startGame } from './js/game.js';



let view = new Views;
let score = new Scores;
// let game = new Game;

//Dummy Data Chances
const chances = [1,5,0,10,10,10,10,0,6,5,2,10];
// const chances = [10,10,10,10,10,10,10,10,10,10,10,10];

let frames = score.getFrameScore(chances);
let framesTotals = score.framesTotals(frames);


//Prediction
let dummyData = {
    mouse: {
        chances: [10, 10, 10, 10, 10, ]
    },
    cat: {
        chances: [10, 9, 0, 10, 5, 4, 10, ]
    }
}

let test = new prediction(dummyData.cat, dummyData.mouse);
test.checkData();



//Game
let pins;

startGame()

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


