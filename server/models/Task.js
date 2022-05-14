




const Sequelize = require('sequelize');
const { dbSequelise } = require('../config/db');

const Task = dbSequelise.define('task', {
  title: {
    type: Sequelize.STRING
  },
  completed_at: {
    type: Sequelize.DATE,
    defaultValue: null
  }
}, {
  updatedAt: false,
  createdAt: 'created_at',
});

/* Task.sync().then(() => {
  console.log('Tasks table created');
}); */

module.exports = Task;

