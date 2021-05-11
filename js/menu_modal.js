var userInputModal = document.querySelector("#User-Input-Menu");
var startGameButton = document.getElementById("start-game-button");
var modalEndGameButton = document.getElementById("end-game-button");
var endGameModal = document.querySelector("#End-Game-Menu");
let userName = document.querySelector('#add-user-input');

// Function to hide User Input Menu and show End Game Menu
startGameButton.addEventListener("click", modal1);
function modal1() {
  if(userName.value){
    userInputModal.style.display = "none";
    endGameModal.style.display = "inline";
  }
}

// function to hide End Game Menu and show User Input Menu
modalEndGameButton.addEventListener("click", modal2);
function modal2() {
  userInputModal.style.display = "inline";
  endGameModal.style.display = "none";
}

