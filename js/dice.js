"use strict";
let player1Name;
var player2Name;
function generateRandomValue(minValue, maxValue) {
    var random = Math.random();
    return Math.floor(random * (maxValue - minValue + 1)) + 1;
}
function changePlayers() {
    let currentPlayerName = document.getElementById("current").innerText;
    if (currentPlayerName == player1Name) {
        document.getElementById("current").innerText = player2Name;
    }
    else {
        document.getElementById("current").innerText = player1Name;
    }
}
window.onload = function () {
    let newGameBtn = document.getElementById("new_game");
    newGameBtn.onclick = createNewGame;
    document.getElementById("roll").onclick = rollDie;
    document.getElementById("hold").onclick = holdDie;
};
function areNamesValid() {
    var isNameValid = true;
    if (player1Name == "" && player2Name == "") {
        window.alert("Both players need a name!!");
        isNameValid = false;
    }
    else if (player1Name.length > 0 && player2Name == "") {
        window.alert("Player 2 needs a name!!");
        isNameValid = false;
    }
    else if (player1Name == "" && player2Name.length > 0) {
        window.alert("Player 1 needs a name!");
        isNameValid = false;
    }
    else if (player1Name == player2Name) {
        window.alert("Player names must be different!");
        isNameValid = false;
    }
    return isNameValid;
}
function createNewGame() {
    player1Name = document.getElementById("player1").value.trim();
    player2Name = document.getElementById("player2").value.trim();
    document.getElementById("score1").value = "0";
    document.getElementById("score2").value = "0";
    if (areNamesValid() == false) {
        return;
    }
    ;
    document.getElementById("turn").classList.add("open");
    document.getElementById("total").value = "0";
    document.getElementById("current").innerText = player1Name;
    document.getElementById("player1").setAttribute("disabled", "disabled");
    document.getElementById("player2").setAttribute("disabled", "disabled");
}
function rollDie() {
    let currTotal = parseInt(document.getElementById("total").value);
    let currentPlayer = document.getElementById("current").innerText;
    let dieRollValue = generateRandomValue(1, 6);
    if (dieRollValue == 1) {
        currTotal = 0;
        changePlayers();
    }
    else {
        currTotal += dieRollValue;
        if (currentPlayer == player1Name) {
            if (parseInt(document.getElementById("score1").value) + currTotal >= 100) {
                window.alert(player1Name + " wins!");
            }
        }
        else {
            if (parseInt(document.getElementById("score2").value) + currTotal >= 100) {
                window.alert(player2Name + " wins!");
            }
        }
    }
    document.getElementById("die").value = dieRollValue.toString();
    document.getElementById("total").value = currTotal.toString();
}
function holdDie() {
    var currPlayerTotal = parseInt(document.getElementById("total").value);
    var player1Score = parseInt(document.getElementById("score1").value);
    var player2Score = parseInt(document.getElementById("score2").value);
    if (document.getElementById("current").innerText == player1Name) {
        player1Score += currPlayerTotal;
        document.getElementById("score1").value = player1Score.toString();
    }
    else {
        player2Score += currPlayerTotal;
        document.getElementById("score2").value = player2Score.toString();
    }
    document.getElementById("total").value = "0";
    changePlayers();
}
