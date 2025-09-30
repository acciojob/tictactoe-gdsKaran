let currentPlayer = "x"; // lowercase for Cypress
let player1 = "";
let player2 = "";
let gameActive = true;

const submitBtn = document.getElementById("submit");
const formDiv = document.querySelector(".player-form");
const boardDiv = document.querySelector(".game-board");
const messageDiv = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

// Start game after entering names
submitBtn.addEventListener("click", () => {
  player1 = document.getElementById("player1").value.trim() || "Player1";
  player2 = document.getElementById("player2").value.trim() || "Player2";

  formDiv.style.display = "none";
  boardDiv.style.display = "block";
  messageDiv.textContent = `${player1}, you're up`;
});

// Handle cell clicks
cells.forEach(cell => {
  cell.addEventListener("click", () => {
    if (!gameActive || cell.textContent !== "") return;

    // Place current player's symbol
    cell.textContent = currentPlayer;

    // Check if current player wins
    if (checkWin(currentPlayer)) {
      const winner = currentPlayer === "x" ? player1 : player2;
      messageDiv.textContent = `${winner} congratulations you won!`;
      gameActive = false;
      return;
    }

    // Check draw
    if (isDraw()) {
      messageDiv.textContent = "It's a draw!";
      gameActive = false;
      return;
    }

    // Switch player for next turn
    currentPlayer = currentPlayer === "x" ? "o" : "x";
    const nextPlayer = currentPlayer === "x" ? player1 : player2;
    messageDiv.textContent = `${nextPlayer}, you're up`;
  });
});

// Check winning combinations for a symbol
function checkWin(symbol) {
  const winCombos = [
    [1,2,3],[4,5,6],[7,8,9], // rows
    [1,4,7],[2,5,8],[3,6,9], // columns
    [1,5,9],[3,5,7]          // diagonals
  ];

  return winCombos.some(combo => {
    const [a, b, c] = combo;
    return (
      document.getElementById(a).textContent === symbol &&
      document.getElementById(b).textContent === symbol &&
      document.getElementById(c).textContent === symbol
    );
  });
}

// Check if all cells are filled
function isDraw() {
  return [...cells].every(cell => cell.textContent !== "");
}
