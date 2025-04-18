// movement.js
export function getDirectionModifier(player) {
  return player === 1 ? 1 : -1;
}

export function getDestinationPoint(start, dieValue, player) {
  const direction = getDirectionModifier(player);
  return start + (dieValue * direction);
}