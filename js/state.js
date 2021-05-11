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
        // this.players = playersArray.map(player => new Player(player));
        this.players = {};
        this.turns = playersArray;
        this.createGame(playersArray)
    }
    createGame (playersArray){
        playersArray.forEach(player => {
            this.players[player] = new Player(player)
        });   
    }
    // addPlayer(){
    //         let player = document.querySelector('#add-user-input').value
    //         if(!this.players[player]){
    //             this.players[player] = new Player(player)
    //         }
    //     }
    // removePlayer(){
    //         let player = document.querySelector('#add-user-input').value
    //         if(this.players[player]){
    //             delete this.players[player];
    //         }
    //     }
    
}


export let playersArray = [];
// export let playersObject = {};

export function fillPlayersArray(){
    let player = document.querySelector('#add-user-input').value
    playersArray.push(player);
    // playersObject[player] = {};
}

export function newGame(playersArray){
    let game = new Game(playersArray);
    return game;
}

export function storeGame(game){
    let counter = 0;
    let storedGame = localStorage.setItem(`savedGame${counter}`, game);
    counter++;
    return storedGame;
}