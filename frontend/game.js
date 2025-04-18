import { checkers, initPortes } from './engine/checkers.js';
import { getValidMoves } from './engine/validator.js';
import { moveChecker } from './engine/game-runner.js';

let currentPlayer = 1;
let currentDice = [2, 4]; // Example roll
let selectedChecker = null;

function updateUI() {
  document.querySelectorAll('.point').forEach(point => {
    point.classList.remove('legal-move', 'selected');
  });

  const legalMoves = getValidMoves(currentPlayer, currentDice);
  legalMoves.forEach(move => {
    document.querySelector(`.point[data-index="${move.from}"]`)?.classList.add('legal-move');
    document.querySelector(`.point[data-index="${move.to}"]`)?.classList.add('legal-move');
  });
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

initPortes();
updateUI();