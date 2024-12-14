const Todo = require('../models/todo');

const addTodo = async (req, res) => {
    try {
        const task = req.body;
        if (!task) return res.status(400).json({ status: false, message: "Task is required" })
        const newTodo = new Todo(task);
        await newTodo.save();
        return res.status(201).json({ status: true, message: "Task created" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const getTodo = async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.user._id }).sort({ createdAt: -1 });
        if (!todos) return res.status(404).json({ status: false, message: "Not found any todos" })
        return res.status(200).json({ status: true, data: todos })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const updateTodo = async (req, res) => {
    try {
        const id = req.params.id;
        const task = req.body;
        const todo = await Todo.findByIdAndUpdate({ _id: id, userId: req.user._id }, task, { new: true });
        if (!todo) return res.status(404).json({ status: false, message: "Todo not found" })
        return res.status(200).json({ status: true, message: "Todo updated successfully", todo })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const deleteTodo = async (req, res) => {
    try {
        const id = req.params.id;
        const todo = await Todo.findByIdAndDelete({ _id: id, userId: req.user._id })
        if (!todo) return res.status(404).json({ status: false, message: "Todo not found" })
        return res.status(200).json({ status: true, message: "Todo deleted successfully" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

module.exports = { addTodo, getTodo, updateTodo, deleteTodo }