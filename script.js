//your JS code here. If required.
let currentPlayer = "X";
let player1 = "";
let player2 = "";
let gameActive = true;

const submitBtn = document.getElementById("submit");
const formDiv = document.querySelector(".player-form");
const boardDiv = document.querySelector(".game-board");
const messageDiv = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

submitBtn.addEventListener("click", () => {
  player1 = document.getElementById("player1").value.trim() || "Player 1";
  player2 = document.getElementById("player2").value.trim() || "Player 2";

  formDiv.style.display = "none";
  boardDiv.style.display = "block";
  messageDiv.textContent = `${player1}, you're up`;
});

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    if (!gameActive || cell.textContent !== "") return;

    cell.textContent = currentPlayer;

    if (checkWin()) {
      let winner = currentPlayer === "X" ? player1 : player2;
      messageDiv.textContent = `${winner}, congratulations you won!`;
      gameActive = false;
      return;
    }

    if (isDraw()) {
      messageDiv.textContent = "It's a draw!";
      gameActive = false;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    let nextPlayer = currentPlayer === "X" ? player1 : player2;
    messageDiv.textContent = `${nextPlayer}, you're up`;
  });
});

function checkWin() {
  const winCombos = [
    [1,2,3],[4,5,6],[7,8,9], // rows
    [1,4,7],[2,5,8],[3,6,9], // cols
    [1,5,9],[3,5,7]          // diagonals
  ];
  return winCombos.some(combo => {
    const [a, b, c] = combo;
    return (
      document.getElementById(a).textContent !== "" &&
      document.getElementById(a).textContent === document.getElementById(b).textContent &&
      document.getElementById(b).textContent === document.getElementById(c).textContent
    );
  });
}

function isDraw() {
  return [...cells].every(cell => cell.textContent !== "");
}
