"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const todos_1 = __importDefault(require("../model/todos"));
const TODOS = [];
const createTodo = (req, res) => {
    const text = req.body.text;
    if (!text)
        throw new Error('test cannot be empty');
    const newTodo = new todos_1.default(Math.random().toString(), text);
    TODOS.push(newTodo);
    res.status(201);
    res.json({ message: 'Created the todo.', createTodo: newTodo });
};
exports.createTodo = createTodo;
const getTodos = (req, res) => {
    res.json({ todos: TODOS });
};
exports.getTodos = getTodos;
const updateTodo = (req, res) => {
    const todoId = req.params.id;
    const updatedText = req.body.text;
    const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
    if (todoIndex === -1)
        throw new Error('Could not find todo');
    TODOS[todoIndex] = new todos_1.default(TODOS[todoIndex].id, updatedText);
    res.status(200);
    res.json({ message: 'updated!', updateTodo: TODOS[todoIndex] });
};
exports.updateTodo = updateTodo;
const deleteTodo = (req, res, next) => {
    const todoId = req.params.id;
    const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
    if (todoIndex === -1)
        throw new Error('Could not find todo');
    TODOS.splice(todoIndex, 1);
    res.status(200);
    res.json({ message: 'Todo deleted!' });
};
exports.deleteTodo = deleteTodo;
