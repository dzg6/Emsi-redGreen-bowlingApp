class Player    {
    constructor(playerName){
        this.playerName = playerName;
        // this.chances = [[0, 1], [2, 3], [4, 5], [6, 7], [8, 9], [10, 11], [12, 13], [14, 15], [16, 17], [18, 19, 20]];
        this.chances = [];
        this.gameScores = [];
        this.totalScore = 0;
    }
}

function createPlayer(playerName){
    return new Player(playerName);
}

export class Game  {
    constructor(playersArray){
        this.players = {};
        this.frameChances = 1;
        this.turns = playersArray;
        this.createGame(playersArray)
        this.activePlayer = this.turns.shift();
        this.pinsRemaining = 10;
    }
    createGame (playersArray){
        playersArray.forEach(player => {
            this.players[player] = new Player(player)
        });   
    }
    
}


export let playersArray = [];

export function newGame(playersArray){
    let game = new Game(playersArray);
    return game;
}

let counter = 0;

export function storeGame(game){
    let storedGame = localStorage.setItem(`savedGame${counter}`, game);
    counter++;
    return storedGame;
}