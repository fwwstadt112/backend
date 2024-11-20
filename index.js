const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

// MongoDB-Verbindung
mongoose.connect('mongodb+srv://fwwstadt112:112112112@cluster0tasks.lq8k0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0tasks', {
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
  origin: 'https://frontend-nu-jet-74.vercel.app', // Ersetze mit deiner Frontend-URL
}));

app.use(express.json()); // Damit wir JSON im Request-Body empfangen können

// Route zum Abrufen der Aufgaben (GET)
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find(); // Alle Aufgaben aus der DB holen
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Fehler beim Abrufen der Aufgaben" });
  }
});

// Route zum Hinzufügen von Aufgaben (POST)
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

// Route zum Ändern des Status einer Aufgabe (PUT)
app.put('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body; // Der neue Status der Aufgabe

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, { completed }, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ error: 'Aufgabe nicht gefunden' });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Ändern des Status' });
  }
});

// Route zum Löschen einer Aufgabe (DELETE)
app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Aufgabe nicht gefunden' });
    }
    res.status(204).send(); // Erfolgreich gelöscht
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Löschen der Aufgabe' });
  }
});

// Server starten
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
