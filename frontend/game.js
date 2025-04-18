const socket = io('http://localhost:3000');

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

  socket.emit('roll_dice', dice); // Send to server
}

function selectDie(index, element, value) {
  if (selectedDice.length >= 2) return;
  if (selectedDice.find(d => d.index === index)) return;

  selectedDice.push({ index, value });
  element.classList.add("selected");

  if (selectedDice.length === 2) {
    console.log("Chosen dice:", selectedDice.map(d => d.value));
    socket.emit('select_dice', selectedDice.map(d => d.value)); // Send selection
  }
}

socket.on('opponent_roll', (dice) => {
  const diceContainer = document.getElementById("dice-container");
  diceContainer.innerHTML = "";
  dice.forEach(value => {
    const die = document.createElement("div");
    die.textContent = value;
    die.className = "die";
    diceContainer.appendChild(die);
  });
});

socket.on('opponent_select', (values) => {
  const diceContainer = document.getElementById("dice-container");
  const dice = diceContainer.children;
  for (let i = 0; i < dice.length; i++) {
    if (values.includes(parseInt(dice[i].textContent))) {
      dice[i].classList.add('selected');
    }
  }
});

socket.on('start_game', (data) => {
  alert('Match found! Game started.');
});