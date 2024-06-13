"use strict";
function generateRandomValue(minValue, maxValue) {
    var random = Math.random();
    return random;
}
function changePlayers() {
    let currentPlayerName = document.getElementById("current").innerText;
    let player1Name = document.getElementById("player1").value;
    let player2Name = document.getElementById("player2").value;
}
window.onload = function () {
    let newGameBtn = document.getElementById("new_game");
    newGameBtn.onclick = createNewGame;
    document.getElementById("roll").onclick = rollDie;
    document.getElementById("hold").onclick = holdDie;
};
function areNamesValid() {
    var errorMsg = "";
    var player1Name = document.getElementById("player1").value.trim;
    var player2Name = document.getElementById("player2").value.trim;
    var isValid = true;
    if (player1Name() == "" || player2Name() == "") {
        errorMsg = "Names are required for both players";
        isValid = false;
    }
    else if (player1Name == player2Name) {
        errorMsg = "Names must be different";
        isValid = false;
    }
}
function createNewGame() {
    document.getElementById("score1").value = "0";
    document.getElementById("score2").value = "0";
    areNamesValid();
    document.getElementById("turn").classList.add("open");
    document.getElementById("total").value = "0";
    document.getElementById("player1").setAttribute("disabled", "disabled");
    document.getElementById("player2").setAttribute("disabled", "disabled");
    changePlayers();
}
function rollDie() {
    let currTotal = parseInt(document.getElementById("total").value);
}
function holdDie() {
    changePlayers();
}
