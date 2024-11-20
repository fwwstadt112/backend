const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

// MongoDB-Verbindung (stellen Sie sicher, dass du die korrekte URL verwendest)
mongoose.connect('mongodb://localhost:27017/todolist', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Datenbank verbunden'))
  .catch(err => console.log('Datenbank Fehler: ', err));

// Aufgabe Schema
const taskSchema = new mongoose.Schema({
  text: String,
  completed: { type: Boolean, default: false },
});

// Task Model
const Task = mongoose.model('Task', taskSchema);

// CORS aktivieren
app.use(cors({
  origin: 'https://frontend-nu-jet-74.vercel.app',
}));

app.use(express.json()); // Damit wir JSON im Request-Body empfangen können

// Route zum Abrufen aller Aufgaben
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Fehler beim Abrufen der Aufgaben" });
  }
});

// Route zum Hinzufügen von Aufgaben
app.post('/api/tasks', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Aufgabetext ist erforderlich" });
  }

  try {
    const newTask = new Task({ text });
    await newTask.save();
    res.status(201).json(newTask); // Erfolgreich hinzugefügt
  } catch (error) {
    res.status(500).json({ error: "Fehler beim Hinzufügen der Aufgabe" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
