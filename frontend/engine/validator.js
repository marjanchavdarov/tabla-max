// validator.js
import { checkers } from './checkers.js';
import { getDirectionModifier } from './movement.js';

export function isMoveLegal(from, to, player) {
  if (to < 0 || to >= 24) return false;
  const destCount = checkers.points[to];
  const isBlocked = (Math.sign(destCount) !== 0 && Math.sign(destCount) !== getDirectionModifier(player));
  return !isBlocked;
}

export function isOpponentBlot(to, player) {
  const destCount = checkers.points[to];
  return Math.abs(destCount) === 1 && Math.sign(destCount) !== getDirectionModifier(player);
}

export function hitChecker(to, player) {
  const opponent = player === 1 ? 2 : 1;
  checkers.points[to] = 0;
  checkers.bar[opponent - 1]++;
}