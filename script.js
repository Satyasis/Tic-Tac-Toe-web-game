let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector(".reset-button");
let newGameButton = document.querySelector("#new-button");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// playerX, playerO
turnX = true;

const winPatterns = [
    [0, 1 ,2],
    [3, 4 ,5],
    [6, 7 ,8],
    [0, 3 ,6],
    [1, 4 ,7],
    [2, 5 ,8],
    [0, 4 ,8],
    [2, 4 ,6],
];

const resetGame = () => {
    turnX = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    count = 0;
};


let count = 0;
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnX){
            box.innerText = "X";
            turnX = false;
            count++;
            // console.log(count);
        } else {
            box.innerText = "O"
            turnX = true;
            count++;
            // console.log(count);
        }
        box.disabled = true;   
        
        checkWinner();
    });
});


const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const showDraw = () => {
    msg.innerText = "Game is draw";
    msgContainer.classList.remove("hide");
    // disableBoxes();
};


const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText; 
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                // console.log("winner", pos1Val);
                showWinner(pos1Val);
            } else if(count === 9 && (pos1Val != pos2Val || pos2Val != pos3Val || pos1Val != pos3Val)){
                showDraw();
            }
        }
    }
};


newGameButton.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetGame);