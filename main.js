/*function doBuisness() {
    alert("click ok to get rid of me");
}*/
class GameManager{
    constructor(){
        this.xOrO= true;
        this.arrayOfMoves= [[0,1,2],[3,4,5],[6,7,8]];
        this.score = [0,0];
        this.counter = 0;
        this.botState=false;
        this.simpleArray=[];
    }
}
const gameManager = new GameManager();
function anyButton(number){
    document.getElementById("bot").disabled=true;
    buildSimpleArray(number);
    goItsYourTurn();
    if(gameManager.xOrO==true){
        document.getElementById(`myBtn${number}`).innerHTML="<span class= o>O</span>";
        gameManager.xOrO = false;
        gameManager.counter++;
    }else{
        document.getElementById(`myBtn${number}`).innerHTML="<span class= x>X</span>";
        gameManager.xOrO = true;
        gameManager.counter++;
    };
    arrayBulider(number);
    disableButton(number);
    checkRows();
    checkColumns();
    checkDiagonal();
    if(gameManager.counter==9){
        onWin("Nobody");
    };
    if(gameManager.botState==true){
        easyBot();
    };
}
function disableButton(number){
    document.getElementById(`myBtn${number}`).disabled= true;
}
function resetBoard(params) {
    for (let index = 1; index < 10; index++) {
        document.getElementById(`myBtn${index}`).innerHTML= "";
        document.getElementById(`myBtn${index}`).disabled= false;
    }
    document.getElementById("bot").disabled=false;
    gameManager.arrayOfMoves= [[0,1,2],[3,4,5],[6,7,8]]; 
    gameManager.xOrO=false;
    goItsYourTurn();
    gameManager.xOrO=true;
    gameManager.simpleArray=[];
    gameManager.botState=false;
    document.getElementById("bot").innerHTML="Solo Mode"
}
function arrayBulider(number){
    if(!gameManager.xOrO){
        if(number<4){
            gameManager.arrayOfMoves[0][number-1] = "o";
        }else if(number<7){
            gameManager.arrayOfMoves[1][number-4] = "o";
        }else if(number<10){
            gameManager.arrayOfMoves[2][number-7] = "o";
        }
    }else{
        if(number<4){
            gameManager.arrayOfMoves[0][number-1] = "x";
        }else if(number<7){
            gameManager.arrayOfMoves[1][number-4] = "x";
        }else if(number<10){
            gameManager.arrayOfMoves[2][number-7] = "x";
        };
    };
    
}
function checkColumns(){
    let columnTrackerO;
    let columnTrackerX;
    for (let index = 0; index < 3; index++) {
        columnTrackerO=0;
        columnTrackerX=0;
        for(let x of gameManager.arrayOfMoves){
            if(x[index]=="o"){
                columnTrackerO++;
            }else if(x[index]=="x"){
                columnTrackerX++;
            }
        }
        if(columnTrackerO==3){
            onWin("o");
        }else if(columnTrackerX==3){
            onWin("x");
        };
    };
};
function checkDiagonal(){
    let diagonalTrackerO=0;
    let diagonalTrackerX=0;
    let reverseDiagonalTrackerO=0;
    let reverseDiagonalTrackerX=0;
    let counter=0;
    let reverseCounter=2;
    for(let x of gameManager.arrayOfMoves){
        if(x[counter]=="o"){
            diagonalTrackerO++;
        }
        if(x[reverseCounter]=="o"){
            reverseDiagonalTrackerO++;
        }
        if(x[reverseCounter]=="x"){
            reverseDiagonalTrackerX++;
        }
        if(x[counter]=="x"){
            diagonalTrackerX++;
        }
        counter++;
        reverseCounter--;
    }
    if(diagonalTrackerO==3){
        onWin("o");
    }
    else if(reverseDiagonalTrackerO==3){
        onWin("o");
    }
    else if(diagonalTrackerX==3){
        onWin("x");
    }
    else if(reverseDiagonalTrackerX==3){
        onWin("x");
    };
};
function checkRows() {
    let rowTrackerO;
    let rowTrackerX;
    for(let x of gameManager.arrayOfMoves){
        rowTrackerO=0;
        rowTrackerX=0;
        for(let i of x){
            if(i=="o"){
                rowTrackerO++;
            }else if(i=="x"){
                rowTrackerX++;
            };
            //console.log(i);
        };
        if(rowTrackerO==3){
            //console.log("happened");
            onWin("o");
        }else if(rowTrackerX==3){
            // console.log("happened");
            onWin("x");
        };
        // console.log(x);
    };
};

function onWin(pram){
    let capital= pram.toUpperCase();
    gameManager.botState=false;
    gameManager.counter=0;
    setTimeout(function() {
        if(confirm(`${capital} Wins\n\nWant to play again?`)){
            resetBoard()};
    }, 1);
    updateScore(capital);
}

function updateScore(playerSymbol) {
    if(playerSymbol=="O"){
        gameManager.score[0]+=1;
        document.getElementById("scoreO").innerHTML= `O: ${gameManager.score[0]}`;
    }
    else if(playerSymbol=="X"){
        gameManager.score[1]+=1;
        document.getElementById("scoreX").innerHTML= `X: ${gameManager.score[1]}`;
    }
}

function goItsYourTurn(){//function name should reflect action of gui's update in refernce to whose turn it is.
    if(gameManager.xOrO== true){
        document.getElementById("yourTurn").innerHTML="It's x's turn";
    }else{
        document.getElementById("yourTurn").innerHTML="It's o's turn";
    }
    if(gameManager.botState==true&gameManager.xOrO== true){
        document.getElementById("yourTurn").innerHTML="Please Wait";
    }
}
function easyBot(){
    let number=Math.floor(Math.random()*8+1)
    
    if(easyBotCheck(number)== true){
        setTimeout(function(){
            gameManager.botState=false;
            anyButton(number);
            gameManager.botState=true;
            return;
        }, Math.floor(Math.random()*1000+200));
    }else{
        easyBot();
    }
};
function turnOnBot(){
    gameManager.botState = true;
    document.getElementById("bot").disabled=true;
    document.getElementById("bot").innerHTML="Player vs CPU";
}
function buildSimpleArray(number){
    gameManager.simpleArray.push(number);
}
function easyBotCheck(number) {
    let array = gameManager.simpleArray;
    for(let x = 0; x < array.length; x++){
        if(array[x] == number){
            return false;
        };
    };
    return true;
}