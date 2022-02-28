"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todos_1 = require("../controllers/todos");
const router = express_1.default.Router();
router.route('/').post(todos_1.createTodo).get(todos_1.getTodos);
router.route('/:id').patch(todos_1.updateTodo).delete(todos_1.deleteTodo);
exports.default = router;
