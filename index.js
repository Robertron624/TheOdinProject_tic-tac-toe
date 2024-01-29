

const GameBoard = (function (){

    const board = ["", "", "", "", "", "", "", "", ""];

    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];

    const render = () => {
        const boardElement = document.getElementById("board");
        boardElement.innerHTML = "";
        for (let i = 0; i < 9; i++) {
            const cellDataIndex = i + 1;
            const cell = document.createElement("div");
            cell.innerHTML = board[i] || "";
            cell.classList.add("cell");
            cell.setAttribute("data-index", cellDataIndex);
            boardElement.appendChild(cell);
        }
    }

    const paintWinningCombo = (combo) => {
        for (let i = 0; i < combo.length; i++) {
            const cell = document.querySelector(`[data-index="${combo[i] + 1}"]`);
            cell.style.backgroundColor = "green";
        }
    }

    const getBoard = () => {
        return board;
    }

    const setOption = (index, option) => {
        board[index] = option;
    }

    const reset = () => {
        for (let i = 0; i < 9; i++) {
            board[i] = "";
        }
    }

    const isDraw = () => {
        return !board.includes("");
    }

    // function will return an object (isGameOver and winner), if there's no winner, winner will be null
    const checkIsGameOver = () => {
        for (let i = 0; i < winningCombos.length; i++) {
            const combo = winningCombos[i];
            const a = board[combo[0]];
            const b = board[combo[1]];
            const c = board[combo[2]];
            if (a && a === b && a === c) {
                return {isGameOver: true, winner: a};
            }
        }
        return {isGameOver: false, winner: null};
    }

    return {render, getBoard, setOption, checkIsGameOver, reset, isDraw};

})()

function main () {
    GameBoard.render();

    let currentPlayer = "X";
    const resetButton = document.getElementById("reset");


    const boardElement = document.getElementById("board");
    boardElement.addEventListener("click", (event) => {
        const cell = event.target;
        const index = cell.getAttribute("data-index") - 1;
        
        if (GameBoard.getBoard()[index] === "") {
            GameBoard.setOption(index, currentPlayer);
            GameBoard.render();
            if (currentPlayer === "X") {
                currentPlayer = "O";
            } else {
                currentPlayer = "X";
            }

            const {isGameOver, winner} = GameBoard.checkIsGameOver();

            const isDraw = GameBoard.isDraw();
            if (isDraw) {
                GameBoard.render();
                setTimeout(() => {
                    alert("It's a draw!");
                }, 100);
                return;
            }

            if (isGameOver) {
                GameBoard.render();
                setTimeout(() => {
                    alert(`Player ${winner} wins!`);
                }, 100);
            }

        }
    });

    resetButton.addEventListener("click", () => {
        GameBoard.reset();
        GameBoard.render();
    });

}

window.onload = main;