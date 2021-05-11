class Player    {
    constructor(playerName){
        this.playerName = playerName;
        this.chances = [[0, 1], [2, 3], [4, 5], [6, 7], [8, 9], [10, 11], [12, 13], [14, 15], [16, 17], [18, 19, 20]];
        this.gameScores = [];
        this.totalScore = 0;
    }
}

function createPlayer(playerName){
    return new Player(playerName);
}

class Game  {
    constructor(playersArray){
        this.players = playersArray.map(player => new Player(player));
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