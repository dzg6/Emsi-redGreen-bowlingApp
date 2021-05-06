import { Views } from './js/views.js';
import { Scores } from './js/scores.js';



let view = new Views;
let score = new Scores;

//Dummy Data Chances
const chances = [1,5,0,10,10,10,10,0,6,5,2,10,2,7];
// const chances = [10,10,10,10,10,10,10,10,10,10,10,10];

let frames = score.getFrameScore(chances);
let framesTotals = score.framesTotals(frames);




 view.updateView(chances, framesTotals)
