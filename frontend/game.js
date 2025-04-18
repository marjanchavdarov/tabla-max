import { checkers, initPortes } from './engine/checkers.js';
import { getValidMoves } from './engine/validator.js';
import { moveChecker } from './engine/game-runner.js';

const socket = io('http://localhost:3000');

let currentPlayer = 1;
let currentDice = [];
let selectedChecker = null;

function updateDiceUI() {
  const display = document.getElementById('dice-display');
  display.textContent = 'Dice: ' + currentDice.join(', ');
}

function updateUI() {
  document.querySelectorAll('.point').forEach(point => {
    point.classList.remove('legal-move', 'selected');
  });

  const legalMoves = getValidMoves(currentPlayer, currentDice);
  legalMoves.forEach(move => {
    document.querySelector(`.point[data-index="${move.from}"]`)?.classList.add('legal-move');
    document.querySelector(`.point[data-index="${move.to}"]`)?.classList.add('legal-move');
  });

  updateDiceUI();
}

document.querySelectorAll('.point').forEach(point => {
  point.addEventListener('click', () => {
    const pointIndex = parseInt(point.dataset.index);
    if (selectedChecker === null) {
      selectedChecker = pointIndex;
      point.classList.add('selected');
    } else {
      const moveSuccess = moveChecker(selectedChecker, pointIndex, currentPlayer);
      if (moveSuccess) {
        selectedChecker = null;
        updateUI();
      } else {
        selectedChecker = null;
        updateUI();
      }
    }
  });
});

document.getElementById('roll-btn').addEventListener('click', () => {
  socket.emit('request_roll');
});

socket.on('dice_result', (dice) => {
  currentDice = dice;
  updateUI();
});

initPortes();
updateUI();