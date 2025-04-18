let currentPlayer = "Player 1";
let variation = "Portes";
let variationPoints = 0;
let timer;

function startGame() {
  alert(`Game start! First variation: ${variation}`);
  currentPlayer = "Player 1";
  updateUI();
  startTurnTimer();
}

function nextTurn() {
  currentPlayer = currentPlayer === "Player 1" ? "Player 2" : "Player 1";
  updateUI();
  startTurnTimer();
}

function updateUI() {
  document.getElementById("turn-indicator").textContent =
    `${currentPlayer}'s turn`;
}

function updatePoints(pointsWon) {
  variationPoints += pointsWon;
  if (variationPoints >= 6) {
    rotateVariation();
  }
}

function rotateVariation() {
  if (variation === "Portes") variation = "Fevga";
  else if (variation === "Fevga") variation = "Plakoto";
  else variation = "Portes";
  variationPoints = 0;
  alert(`Next variation: ${variation}`);
}

function startTurnTimer() {
  clearTimeout(timer);
  let seconds = 30;
  timer = setInterval(() => {
    document.getElementById("turn-indicator").textContent =
      `${currentPlayer}'s turn - ${seconds}s left`;
    seconds--;
    if (seconds < 0) {
      clearInterval(timer);
      autoPlay();
    }
  }, 1000);
}

function autoPlay() {
  alert(`${currentPlayer} ran out of time. Auto-move triggered.`);
  nextTurn();
}