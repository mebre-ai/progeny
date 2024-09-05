const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const statusDisplay = document.getElementById("status");
const resetButton = document.getElementById("resetButton");

const player = "X";
const ai = "O";
let gameActive = true;
let gameBoard = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameBoard[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    makeMove(clickedCellIndex, player);
    if (checkWin(player)) {
        endGame(player);
        return;
    }

    if (isBoardFull()) {
        endGame(null);
        return;
    }

    setTimeout(() => {
        const aiMove = getBestMove();
        makeMove(aiMove, ai);
        if (checkWin(ai)) {
            endGame(ai);
            return;
        }
        if (isBoardFull()) {
            endGame(null);
        }
    }, 500);
}

function makeMove(index, currentPlayer) {
    gameBoard[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
}

function checkWin(currentPlayer) {
    return winningConditions.some(condition => {
        return condition.every(index => gameBoard[index] === currentPlayer);
    });
}

function isBoardFull() {
    return gameBoard.every(cell => cell !== "");
}

function getBestMove() {
    const availableMoves = gameBoard
        .map((cell, index) => (cell === "" ? index : null))
        .filter(index => index !== null);

    // Basic AI: Random move
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}

function endGame(winner) {
    gameActive = false;
    if (winner) {
        statusDisplay.textContent = `Player ${winner} wins!`;
    } else {
        statusDisplay.textContent = "It's a tie!";
    }
}

function resetGame() {
    gameActive = true;
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => (cell.textContent = ""));
    statusDisplay.textContent = "";
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);