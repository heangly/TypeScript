import express from 'express'
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo
} from '../controllers/todos'
const router = express.Router()

router.route('/').post(createTodo).get(getTodos)
router.route('/:id').patch(updateTodo).delete(deleteTodo)

export default router
