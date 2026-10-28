
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resultText = document.getElementById("result");

let board = Array(9).fill("");
let currentPlayer = "X";
let gameOver = false;

let scores = {
    X: 0,
    O: 0,
    draws: 0
};

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWinner() {
    for (const line of winningCombinations) {
        const [a, b, c] = line;

        if (
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            return line;
        }
    }

    return null;
}

function updateScores() {
    document.getElementById("scoreX").textContent = scores.X;
    document.getElementById("scoreO").textContent = scores.O;
    document.getElementById("draws").textContent = scores.draws;
}

function handleMove(event) {
    const index = Number(event.currentTarget.dataset.index);

    if (gameOver || board[index] !== "") {
        return;
    }

    board[index] = currentPlayer;

    event.currentTarget.textContent = currentPlayer;
    event.currentTarget.classList.add(currentPlayer.toLowerCase());
    event.currentTarget.disabled = true;

    const winningLine = checkWinner();

    if (winningLine) {
        gameOver = true;

        winningLine.forEach(i => {
            cells[i].classList.add("winner");
        });

        resultText.textContent = `Player ${currentPlayer} wins!`;
        statusText.textContent = "Round complete";

        scores[currentPlayer]++;
        updateScores();
        return;
    }

    if (board.every(cell => cell !== "")) {
        gameOver = true;
        resultText.textContent = "It's a draw!";
        statusText.textContent = "Round complete";

        scores.draws++;
        updateScores();
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function newGame() {
    board = Array(9).fill("");
    currentPlayer = "X";
    gameOver = false;

    cells.forEach(cell => {
        cell.textContent = "";
        cell.disabled = false;
        cell.classList.remove("x", "o", "winner");
    });

    statusText.textContent = "Player X's turn";
    resultText.textContent = "";
}

function resetScores() {
    scores = {
        X: 0,
        O: 0,
        draws: 0
    };

    updateScores();
}

cells.forEach(cell => {
    cell.addEventListener("click", handleMove);
});

document.getElementById("new-game")
    .addEventListener("click", newGame);

document.getElementById("reset-scores")
    .addEventListener("click", resetScores);
