const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Configurações
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conexão com MongoDB
mongoose.connect('mongodb://localhost:27017/todolist', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Schema e Model de Tarefa
const TaskSchema = new mongoose.Schema({
    name: String,
    completed: Boolean
});
const Task = mongoose.model('Task', TaskSchema);

// CRUD Endpoints
app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task);
});

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.status(200).send(tasks);
});

app.put('/tasks/:id', async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send(task);
});

app.delete('/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

// Iniciar servidor
app.listen(3000, () => {
    console.log('Backend rodando na porta 3000');
});
