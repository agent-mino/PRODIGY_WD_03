document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const messageElement = document.querySelector(".message");
    const restartButton = document.getElementById("restart");
    let currentPlayer = "X";
    let board = ["", "", "", "", "", "", "", "", ""];
    let isGameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const handleCellClick = (e) => {
        const cell = e.target;
        const index = cell.getAttribute("data-index");

        if (board[index] !== "" || !isGameActive) {
            return;
        }

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        checkWinner();
        switchPlayer();
    };

    const checkWinner = () => {
        let roundWon = false;

        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            messageElement.textContent = `${currentPlayer} has won!`;
            isGameActive = false;
        } else if (!board.includes("")) {
            messageElement.textContent = "It's a draw!";
            isGameActive = false;
        }
    };

    const switchPlayer = () => {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    };

    const restartGame = () => {
        board = ["", "", "", "", "", "", "", "", ""];
        cells.forEach(cell => cell.textContent = "");
        messageElement.textContent = "";
        currentPlayer = "X";
        isGameActive = true;
    };

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    restartButton.addEventListener("click", restartGame);
});
