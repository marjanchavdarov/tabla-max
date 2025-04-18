let currentPlayer = "Player 1";
let variation = "Portes";
let variationPoints = 0;
let timer;
let isBotActive = true; // Enable bot for Player 2

function startGame() {
  alert(`Game start! First variation: ${variation}`);
  currentPlayer = "Player 1";
  updateUI();
  startTurnTimer();
}

function nextTurn() {
  currentPlayer = currentPlayer === "Player 1" ? "Player 2" : "Player 1";
  updateUI();
  if (isBotActive && currentPlayer === "Player 2") {
    setTimeout(botMove, 2000); // Simulate delay
  } else {
    startTurnTimer();
  }
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

// Surrender logic
function handleSurrender() {
  const winner = currentPlayer === "Player 1" ? "Player 2" : "Player 1";
  updateLeaderboard(winner, true);
  alert(`${currentPlayer} surrendered! ${winner} wins.`);
  updatePoints(3);
  nextTurn();
}

// Leaderboard
function updateLeaderboard(winner, wasSurrender) {
  const stats = JSON.parse(localStorage.getItem('tablaStats') || '{}');
  stats[winner] = (stats[winner] || 0) + 1;
  stats.surrenders = (stats.surrenders || 0) + (wasSurrender ? 1 : 0);
  localStorage.setItem('tablaStats', JSON.stringify(stats));
  renderLeaderboard();
}

function renderLeaderboard() {
  const stats = JSON.parse(localStorage.getItem('tablaStats') || '{}');
  document.getElementById("stats").innerHTML = `
    Wins: ${stats["Player 1"] || 0} (P1) vs ${stats["Player 2"] || 0} (P2)<br>
    Surrenders: ${stats.surrenders || 0}
  `;
}

// Bot move simulation
function botMove() {
  rollDice();
  setTimeout(() => {
    const diceElements = document.querySelectorAll('.die');
    if (diceElements.length >= 2) {
      diceElements[0].click();
      diceElements[1].click();
    }
    startTurnTimer();
  }, 1500);
}

window.onload = () => {
  renderLeaderboard();
};