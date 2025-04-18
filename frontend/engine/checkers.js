// checkers.js
export const checkers = {
  points: Array(24).fill(0),
  bar: [0, 0],        // [Player1, Player2]
  borneOff: [0, 0]    // [Player1, Player2]
};

export function initPortes() {
  checkers.points = [
    2, 0, 0, 0, 0, -5,  0, -3, 0, 0, 0, 5,
    -5, 0, 0, 0, 3, 0,  5, 0, 0, 0, 0, -2
  ];
}