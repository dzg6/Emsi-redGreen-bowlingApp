class Player    {
    constructor(playerName){
        this.playerName = playerName;
        this.chances = [];
        this.gameScores = [];
        this.totalScore = 0;
    }
}

export function createPlayer(playerName){
    return new Player(playerName);
}

export class Game  {
    constructor(playersArray){
        this.players = playersArray.map(player => new Player(player));
    }
}

export let playerArray = [];

export function makePlayerArray(){
    playerArray.push(document.querySelector('#add-user-input').value);
}