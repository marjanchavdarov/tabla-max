// test-cases.js
import { checkers, initPortes } from './checkers.js';
import { getDestinationPoint } from './movement.js';
import { moveChecker } from './game-runner.js';

initPortes();
console.log("Initial points:", checkers.points);

const player = 1;
const start = 0;
const dieValue = 6;
const to = getDestinationPoint(start, dieValue, player);
const success = moveChecker(start, to, player);

console.log("Move result:", success);
console.log("Updated points:", checkers.points);
