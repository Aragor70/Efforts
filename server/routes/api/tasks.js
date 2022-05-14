const express = require('express');
const TaskController = require('../../controllers/TaskController.js');
const router = express.Router();

const taskController = new TaskController;


//route GET    api/tasks/
//description  Get the tasks with a filtering
router.get('/', taskController.getTasks);

//route GET    api/tasks/:id
//description  Get the task by id
router.get('/:id', taskController.getTask);

//route POST    api/tasks/
//description   Create a new task
router.post('/', taskController.createTask);

//route PUT    api/tasks/:id
//description  Update task by id
router.put('/:id', taskController.updateTask);

//route DELETE  api/tasks/:id
//description   Delete task by id
router.delete('/:id', taskController.deleteTask);

module.exports = router