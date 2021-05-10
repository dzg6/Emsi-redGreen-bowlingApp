class Player    {
    constructor(playerName){
        this.playerName = playerName;
        this.chances = [];
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

export function fillPlayersArray(){
    playersArray.push(document.querySelector('#add-user-input').value);
}

export function newGame(playersArray){
    let game = new Game(playersArray);
}