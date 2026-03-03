const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");
const submitBtn = document.getElementById("submit");
const message = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let currentPlayer = "";
let currentSymbol = "x";
let player1 = "";
let player2 = "";
let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

submitBtn.addEventListener("click", () => {
  player1 = player1Input.value.trim();
  player2 = player2Input.value.trim();

  if (!player1 || !player2) return;

  currentPlayer = player1;
  currentSymbol = "x";

  message.textContent = `${currentPlayer}, you're up`;
});

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (board[index] !== "" || gameOver) return;

    board[index] = currentSymbol;
    cell.textContent = currentSymbol;

    if (checkWinner()) {
      message.textContent = `${currentPlayer} congratulations you won!`;
      gameOver = true;
      return;
    }

    if (!board.includes("")) {
      message.textContent = "It's a draw!";
      gameOver = true;
      return;
    }

    if (currentSymbol === "x") {
      currentSymbol = "o";
      currentPlayer = player2;
    } else {
      currentSymbol = "x";
      currentPlayer = player1;
    }

    message.textContent = `${currentPlayer}, you're up`;
  });
});

function checkWinner() {
  const patterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  return patterns.some(([a,b,c]) =>
    board[a] &&
    board[a] === board[b] &&
    board[a] === board[c]
  );
}