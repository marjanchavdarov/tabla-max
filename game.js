// 4Dice logic: roll 4 dice, allow user to pick 2
function rollDice() {
  const dice = [];
  for (let i = 0; i < 4; i++) {
    dice.push(Math.floor(Math.random() * 6) + 1);
  }

  const diceContainer = document.getElementById("dice-container");
  diceContainer.innerHTML = "";

  dice.forEach((value, index) => {
    const die = document.createElement("div");
    die.textContent = value;
    die.className = "die";
    die.onclick = () => selectDie(index);
    diceContainer.appendChild(die);
  });

  // TODO: allow selection of 2 dice and lock others
}
