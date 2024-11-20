const express = require('express');
const cors = require('cors'); // Importiere das CORS-Paket
const app = express();

// CORS aktivieren
app.use(cors({
  origin: 'https://frontend-nu-jet-74.vercel.app',  // Die URL deines Frontends
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Die HTTP-Methoden, die erlaubt sind
}));

// Beispiel-Route für Aufgaben
app.get('/api/tasks', (req, res) => {
  res.json([
    { _id: '1', text: 'Aufgabe 1', completed: false },
    { _id: '2', text: 'Aufgabe 2', completed: true },
  ]);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
