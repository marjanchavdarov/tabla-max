// Main app logic: player turns, variation rotation, game start
let currentPlayer = "Player 1";
let variation = "Portes"; // Portes → Fevga → Plakoto

function startGame() {
  console.log("Game started with", variation);
  // TODO: handle game init and variation logic
}

function selectDie(index) {
  console.log("Selected die index:", index);
  // TODO: track selected dice (max 2)
}
let currentPlayer = "Player 1";
let variation = "Portes";
let variationPoints = 0;

function startGame() {
  alert(`Game start! First variation: ${variation}`);
  currentPlayer = "Player 1";
  updateUI();
}

function nextTurn() {
  currentPlayer = currentPlayer === "Player 1" ? "Player 2" : "Player 1";
  updateUI();
}

function updateUI() {
  document.getElementById("turn-indicator").textContent = `Current Turn: ${currentPlayer}`;
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
let timer;
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
  startTurnTimer();
}
