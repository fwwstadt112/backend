const express = require("express");
const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    text: String,
    done: Boolean,
});

const Task = mongoose.model("Task", TaskSchema);

const router = express.Router();

router.get("/", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

router.post("/", async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
});

router.put("/:id", async (req, res) => {
    const task = await Task.findById(req.params.id);
    task.done = !task.done;
    await task.save();
    res.json(task);
});

router.delete("/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).end();
});

module.exports = router;
