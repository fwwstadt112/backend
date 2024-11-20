const express = require('express');
const cors = require('cors'); // Importiere cors

const app = express();

// Erlaube CORS-Anfragen von deinem Frontend
app.use(cors({
  origin: 'https://frontend-nu-jet-74.vercel.app', // Deine Frontend-Domain hier angeben
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Die erlaubten Methoden
}));

// Deine API-Routen hier (z. B. /api/tasks)
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
