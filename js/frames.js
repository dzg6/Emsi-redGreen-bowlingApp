//This class manages the frame and current player
export class Frame {
    constructor(){ 
        this.round = 1;
        this.playerKey = '';
        this.lastFrame = 0;
    };


    newRoundTest(game) {
        if (this.playerKey == game.activePlayer) {
            this.round++;
        }
    }

    getActivePlayerMessage(game){
        game.activePlayer = game.turns.shift();
        if(game.activePlayer){
            document.getElementById("activePlayer").innerHTML = game.activePlayer;
        }else{
            document.getElementById("activePlayer").innerHTML = 'GAME OVER';
        }

    }

    frameManagement(game, pins) {

        if (this.round == 10) {
            this.lastFrame++;

            if (pins == 10) {
                game.pinsRemaining = 10;
                game.frameChances = 1;
                if (this.lastFrame >= 3) {
                    this.getActivePlayerMessage(game)
                    
                    this.lastFrame = 0;
                }
            } else if (game.pinsRemaining == pins) {
                game.pinsRemaining = 10;
                game.frameChances = 2;
                if (this.lastFrame >= 3) {
                    this.getActivePlayerMessage(game)
                    this.lastFrame = 0;
                }

            } else {
                this.frameUpdate(game, pins)
            }

        } else {
            this.frameUpdate(game, pins)
        }



    }

    frameUpdate(game, pins) {
        if (pins == 10) {
            game.frameChances = 1;
            if (this.lastthis >= 3) {
                this.lastFrame = 0;
            } else {
                game.turns.push(game.activePlayer);
            }
            this.getActivePlayerMessage(game)
            game.pinsRemaining = 10;
            this.newRoundTest(game)
        } else if (game.frameChances >= 2) {
            game.frameChances = 1;
            if (this.lastFrame >= 2) {
                this.lastFrame = 0;
            } else {
                game.turns.push(game.activePlayer);
            }
            this.getActivePlayerMessage(game)
            game.pinsRemaining = 10;
            this.newRoundTest(game)
        } else {
            game.frameChances++;
            game.pinsRemaining = game.pinsRemaining - pins;

        }
    }
}