const asyncHandler = require("../middlewares/async");
const Task = require("../models/Task");
const ErrorResponse = require("../tools/ErrorResponse");

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/* const TaskService = require("../services/TaskService");

const taskService = new TaskService() */

class TaskController {

    pattern = /^[0-9a-zA-Z \-_.,]+$/

    getTasks = asyncHandler( async(req, res, next) => {

        const { phrase = '', startDate, endDate, status } = req.query;

        const createdAtOptions = startDate && endDate ? {
            createdAt: {
                [Op.between]: [startDate, endDate]
            }
        } : {}

        const completedAtOptions = status === 'pending' ? {
            completed_at: null
        } : status === 'completed' ? {
            completed_at: {
                [Op.not]: null
            }
        } : {}

        const tasks = await Task.findAll({
            where: {
                title: {
                    [Op.iLike]: `%${phrase}%`
                },
                ...createdAtOptions,
                ...completedAtOptions
            },
            order: [
                ['id', 'DESC']
            ],
        })

        return res.json({
            success: true,
            tasks,
        })
        
    })
    
    getTask = asyncHandler( async(req, res, next) => {

        const { id } = req.params;
        const task = await Task.findByPk(id);
    
        if (!task) {
            return next(new ErrorResponse('Task does not exist.', 404)); 
        }
    
        return res.status(200).json({
            success: true,
            task,
        })
        
    })
    
    createTask = asyncHandler( async(req, res, next) => {

        const { title } = req.body;

        if (!title.match(this.pattern)) {
            return next(new ErrorResponse('Use letters, numbers, spaces, commas (,) dots (.) dashes (-), or underlines (_).', 422)); 
        }
        
        const task = await Task.create({ title });


        return res.status(201).json({
            message: "Task Created",
            success: true,
            task,
        });

    })

    updateTask = asyncHandler( async(req, res, next) => {

        const { id } = req.params;
        const { title, isCompleted } = req.body;
        
        const task = await Task.findByPk(id);

        if (!task) {
            return next(new ErrorResponse('Task does not exist.', 404)); 
        }

        if (title && !title.match(this.pattern)) {
            return next(new ErrorResponse('Use letters, numbers, spaces, commas (,), dots (.), dashes (-), or underlines (_).', 422)); 
        }

        task.title = await title || task.title;
        task.completed_at = await (isCompleted ? (task.completed_at ? null : new Date) : task.completed_at)

        await task.save();

        return res.status(200).json({
            message: "Task was updated.",
            success: true,
            task,
        });

    })

    deleteTask = asyncHandler( async(req, res, next) => {

        const { id } = req.params;
        
        
        const task = await Task.findByPk(id);

        
        if (!task) {
            return next(new ErrorResponse('Task does not exist.', 404)); 
        }
        
        await task.destroy();


        return res.status(200).json({
            message: "Task was updated.",
            success: true,
            task,
        });

    })


}

module.exports = TaskController;