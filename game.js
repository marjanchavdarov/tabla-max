let selectedDice = [];

function rollDice() {
  const dice = [];
  for (let i = 0; i < 4; i++) {
    dice.push(Math.floor(Math.random() * 6) + 1);
  }

  const diceContainer = document.getElementById("dice-container");
  diceContainer.innerHTML = "";
  selectedDice = [];

  dice.forEach((value, index) => {
    const die = document.createElement("div");
    die.textContent = value;
    die.className = "die";
    die.onclick = () => selectDie(index, die, value);
    diceContainer.appendChild(die);
  });

  window.currentRoll = dice;
}

function selectDie(index, element, value) {
  if (selectedDice.length >= 2) return;
  if (selectedDice.find(d => d.index === index)) return;

  selectedDice.push({ index, value });
  element.classList.add("selected");

  if (selectedDice.length === 2) {
    console.log("Chosen dice:", selectedDice.map(d => d.value));
  }
}