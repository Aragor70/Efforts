require('dotenv').config({ path: './config/config.env' });

const path = require('path');

const express = require('express');

const errorHandler = require('./middlewares/error');
const tasksRouter = require('./routes/api/tasks');


const app = express();


require('./config/db');

app.use(express.json({ extended: false }))

app.use(express.static('../client/build'))

app.get('/', (req, res) => {

    res.send('Server is Running...')

})

const tasks = app.use("/api/tasks", tasksRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
})

app.use(errorHandler)

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}.`));

// event lets us handle promises that were rejected but have not yet been handled.

process.on('unhandledRejection', (err, _promise) => {
    console.log(`Error message: ${err.message}`)
    server.close(() => process.exit(1))
})
module.exports = {tasks}