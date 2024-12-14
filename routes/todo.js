const express = require('express');
const router = express.Router();
const { userAuth, adminAuth } = require('../middleware/auth');
const { addTodo, getTodo, updateTodo, deleteTodo } = require('../controllers/todo');

router.post('add-todo', userAuth, addTodo);
router.get('get-todo', userAuth, getTodo);
router.put('/:id', userAuth, updateTodo);
router.delete('/:id', userAuth, deleteTodo);




module.exports = router;