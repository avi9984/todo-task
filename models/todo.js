const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const todoSchema = new mongoose.Schema({
    userId: { type: ObjectId, ref: 'User', required: true },
    task: { type: String, required: true },
    completed: { type: Boolean, default: false }
}, { versionKey: false, timestamps: true })
const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;