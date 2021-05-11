
/* To Predict needed score to win
*  Calculate the possible points left in the game for each player
*  Calculate the minimal amount of points Needed to win if in the lead
*  Calculate  the difference between the score ahead of you against your score and the amount of points you can achieve
*   If you can surpass the opponent what is the minimal amount of points needed. 
*  
*  
*/

import { Scores } from "./scores.js";

// This starts to become a cat and mouse game where you need to get a little further ahead per round or you lose
//  If the player bowls a perfect game you will never let the opponent catch up. 

// mouse = the score the player is hunting to surpass
// cat = the player who is trying to catch upto the mouse





let allScoresCurrent = [];
let maximumScorePossible;
let mouseScore;
let catScore;
let framesRemaining;
let chancesRemaining
let catAverageScore  // The average score of the cat per frame
let mouseAverageScore // The average score per frame of the mouse

// mouseScore - catScore = scoreGap // The score gap to surpass

// catAverage - mouseAverageScore


// //More accurate possible victory using the predicated
// catMaxScore - scoreGap = possibleVictory// if Negative you are at your highest position, if positive you have a chance.

//possibleVictory / framesRemaining = AvgAmount of points need // This is if the opponent only hits guttr balls.


export class prediction extends Scores{
    constructor(cat, mouse){
        super()
        this.framesRemaining = 5;  // Get frames remaining from another function?
        this.mouse = this.processScores(mouse);
        this.cat = this.processScores(cat)
    }

    checkData(){
        console.log(this.cat)
        console.log(this.mouse)
    }

    checkRecentStrikes(data, m){
        let length = data.chances.length;
        let c0 = data.chances[length - 3];
        let c1 = data.chances[length - 2];
        let c2 = data.chances[length - 1];
        let points = 0;
        if(c0 === 10 && c1 === 10 && c2 === 10){
            points += 20 / m;
        }else if (c0 + c1 === 10){
            // points = 10 + c2; 
        }
        if(c2 === 10){
            points += 10 * m;
        }
        console.log(points)
        return points;
    }

    processScores(data){
        let player = {};
       player.frameScores = super.getFrameScore(data.chances)
       player.currentScore = this.getCurrentScore(player.frameScores) + this.checkRecentStrikes(data, 1);
        player.frameAverage = player.currentScore / (10 - this.framesRemaining);
        player.maximumScore = (30 * this.framesRemaining) + player.currentScore + this.checkRecentStrikes(data, 2); //could get more advanced if previous frame is a strike
        player.predictedScore = player.currentScore + (this.framesRemaining * player.frameAverage)
        return player;
    }

    getCurrentScore(frames){
        let totals = 0;
        frames.forEach((frame, index, array) => { 
            if((index - 1) >= 0){
              totals = totals + frame;
            }else{
                totals = frame;
            }
        })
          return totals;
    }



}

