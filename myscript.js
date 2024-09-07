const boxes = document.querySelectorAll(".box");
const resetButton = document.querySelector(".reset-button");
const dialogBox = document.querySelector("dialog");
const pElement = dialogBox.querySelector("p");

let countBoxClicked = 0; // counts number of button clicked.
let defaultWinner = null; // by default no one is winner.
let turnX = true; // playerO, playerX, initially player x will start the game.
let colorBoxes; // used for changing color after a win.

// total possible winning scenarios.
const winningPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// disables the click on each box.
const disableBoxes = () => {
    for (box of boxes) {
        box.disabled = true;
    }
};

// enables the click on each box and removes the content of the box.
const enableBoxes = () => {
    for (box of boxes) {
        box.disabled = false;
        box.textContent = "";
    }
};

// this will show winner.
const showWinner = (winner) => {
    defaultWinner = winner;
    pElement.textContent = `congratulations 🎉, winner is ${winner}`;
    dialogBox.classList.add("show");
    disableBoxes();
};

// checking the winner.
const checkWinner = () => {
    for (let pattern of winningPatterns) {
        let pos1Value = boxes[pattern[0]].textContent;  // calculating the content of box at index which is stored in 2D array.
        let pos2Value = boxes[pattern[1]].textContent;
        let pos3Value = boxes[pattern[2]].textContent;

        if (pos1Value !== "", pos2Value !== "", pos3Value !== "") {
            if (pos1Value === pos2Value && pos2Value === pos3Value) {
                // if all three index value is same then it is the winner.
                showWinner(pos1Value);
                // changing box color to when it is a win.
                colorBoxes = pattern;
                changeWinColor();
            }
        }
    }
};

// change the box color after a win.
const changeWinColor = () => {
    boxes[colorBoxes[0]].classList.add("color-win");
    boxes[colorBoxes[1]].classList.add("color-win");
    boxes[colorBoxes[2]].classList.add("color-win");
}

// remove the box win color after reset.
const removeWinColor = () => {
    if (colorBoxes) {
        boxes[colorBoxes[0]].classList.remove("color-win");
        boxes[colorBoxes[1]].classList.remove("color-win");
        boxes[colorBoxes[2]].classList.remove("color-win");
    }
};

// change box color after a draw.
const changeDrawColor = () => {
    boxes.forEach(box => {
        box.classList.add("color-draw");
    });
};

// change the box draw color after reset.
const removeDrawColor = () => {
    console.log("it runs", boxes);
    boxes.forEach(box => {
        box.classList.remove("color-draw");
    });
};

// adding event listener on each box and checking win condition and draw.
boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (turnX) {
            // by default, X will always move first.
            box.textContent = "X";
            turnX = false;
        } else {
            box.textContent = "O";
            turnX = true;
        }
        box.disabled = true;    // disabling the button which has been clicked once.
        countBoxClicked++;
        checkWinner();
        // below is the draw condition.
        if (countBoxClicked == 9 && defaultWinner === null) {
            pElement.textContent = `draw 💀, play again !`;
            changeDrawColor();
            dialogBox.classList.add("show");
        }
    });
});

// reseting the game.
resetButton.addEventListener("click", () => {
    // changing all default values.
    turnX = true;
    countBoxClicked = 0;
    defaultWinner = null;
    dialogBox.classList.remove("show"); // removing the dialog box.
    enableBoxes();  // enabling the box again, so it can be clickable again.
    removeWinColor();
    removeDrawColor();
});