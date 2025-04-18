// game-runner.js
import { checkers } from './checkers.js';
import { getDirectionModifier } from './movement.js';
import { isMoveLegal, isOpponentBlot, hitChecker } from './validator.js';

export function moveChecker(from, to, player) {
  if (!isMoveLegal(from, to, player)) return false;

  const mod = getDirectionModifier(player);
  checkers.points[from] -= mod;

  if (isOpponentBlot(to, player)) {
    hitChecker(to, player);
  }

  checkers.points[to] += mod;
  return true;
}