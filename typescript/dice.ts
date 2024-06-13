let player1Name: string;
var player2Name: string;

function generateRandomValue(minValue:number, maxValue:number):number{
    var random = Math.random();
    
    //TODO: use random to generate a number between min and max
    return Math.floor(random * (maxValue - minValue +1)) + 1;
}


function changePlayers():void{
    let currentPlayerName = (<HTMLElement>document.getElementById("current")).innerText;
    //let player1Name = (<HTMLInputElement>document.getElementById("player1")).value;
    //let player2Name = (<HTMLInputElement>document.getElementById("player2")).value;

    //swap from player to player by comparing current name to player names
    //set currentPlayerName to the next player
    if (currentPlayerName == player1Name) {
        (<HTMLElement>document.getElementById("current")).innerText = player2Name;
    } else {
        (<HTMLElement>document.getElementById("current")).innerText = player1Name;
    }
}

window.onload = function(){
    let newGameBtn = document.getElementById("new_game") as HTMLButtonElement;
    newGameBtn.onclick = createNewGame;

    (<HTMLButtonElement>document.getElementById("roll")).onclick = rollDie;

    (<HTMLButtonElement>document.getElementById("hold")).onclick = holdDie;
}

function areNamesValid() {
    
    var isNameValid = true;
    
    if ( player1Name == "" && player2Name =="" ) {
        window.alert("Both players need a name!!");
        isNameValid = false;        
    } else if ( player1Name.length > 0 && player2Name == "" ) {
        window.alert("Player 2 needs a name!!");
        isNameValid = false;
    } else if (player1Name == "" && player2Name.length > 0) {
        window.alert("Player 1 needs a name!");
        isNameValid = false;
    } else if (player1Name == player2Name) {
        window.alert("Player names must be different!");
        isNameValid = false;
    }
    
    return isNameValid;
}

function createNewGame(){
    //var player1Name = (<HTMLInputElement>document.getElementById("player1")).value.trim();
    player1Name = (<HTMLInputElement>document.getElementById("player1")).value.trim();
    //var player2Name = (<HTMLInputElement>document.getElementById("player2")).value.trim();
    player2Name = (<HTMLInputElement>document.getElementById("player2")).value.trim();
    //set player 1 and player 2 scores to 0
    (<HTMLInputElement>document.getElementById("score1")).value = "0";
    (<HTMLInputElement>document.getElementById("score2")).value = "0";

    //verify each player has a name
    //if both players don't have a name display error
    //the game can't be played
    if( areNamesValid() == false ) {
        return;
    };
    //if both players do have a name start the game!
    (<HTMLElement>document.getElementById("turn")).classList.add("open");
    (<HTMLInputElement>document.getElementById("total")).value = "0";
    //always start with Player 1
    (<HTMLElement>document.getElementById("current")).innerText = player1Name;
    
    
    //lock in player names and then change players
    (<HTMLInputElement>document.getElementById("player1")).setAttribute("disabled", "disabled");
    (<HTMLInputElement>document.getElementById("player2")).setAttribute("disabled", "disabled");
    //changePlayers();
}

function rollDie():void{
    let currTotal = parseInt((<HTMLInputElement>document.getElementById("total")).value);
    let currentPlayer = (<HTMLElement>document.getElementById("current")).innerText; 
    
    //roll the die and get a random value 1 - 6 (use generateRandomValue function)
    let dieRollValue = generateRandomValue(1,6);

    //if the roll is 1
    //  change players
    //  set current total to 0
    if (dieRollValue == 1){
        currTotal = 0;
        changePlayers();
    //if the roll is greater than 1
    //  add roll value to current total
    } else {
        currTotal += dieRollValue;
        //if the current player's score so far + current score in this player's round >= 100, the current player wins!
        //determine which player it is
        if (currentPlayer == player1Name) {
            if (parseInt((<HTMLInputElement>document.getElementById("score1")).value) + currTotal >= 100) {
                //player1 wins
                window.alert(player1Name + " wins!");

            }
        } else {
            if (parseInt((<HTMLInputElement>document.getElementById("score2")).value) + currTotal >= 100) {
                //player 2 wins
                window.alert(player2Name + " wins!");

            }
        }
    }

    //set the die roll to value player rolled
    (<HTMLInputElement>document.getElementById("die")).value = dieRollValue.toString();
    //display current total on form
    (<HTMLInputElement>document.getElementById("total")).value = currTotal.toString();
}

function holdDie():void{
    //get the current turn total
    var currPlayerTotal = parseInt((<HTMLInputElement>document.getElementById("total")).value);
    var player1Score = parseInt((<HTMLInputElement>document.getElementById("score1")).value);
    var player2Score = parseInt((<HTMLInputElement>document.getElementById("score2")).value);
    //determine who the current player is
    //add the current turn total to the player's total score
    if ((<HTMLElement>document.getElementById("current")).innerText == player1Name) {
         player1Score += currPlayerTotal;
         (<HTMLInputElement>document.getElementById("score1")).value = player1Score.toString();
    } else {
         player2Score += currPlayerTotal;
         (<HTMLInputElement>document.getElementById("score2")).value = player2Score.toString();
    }
    
    //reset the turn total to 0
    (<HTMLInputElement>document.getElementById("total")).value = "0";

    //change players
    changePlayers();
}
