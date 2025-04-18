const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let gameState = {
  players: [],
  currentPlayer: null,
  variation: "Portes",
  points: 0
};

app.get('/status', (req, res) => {
  res.json(gameState);
});

app.post('/move', (req, res) => {
  // Placeholder for move logic
  res.send("Move received");
});

app.listen(PORT, () => {
  console.log(`Tabla Max server running on http://localhost:${PORT}`);
});