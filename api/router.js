const express = require('express');
const router = express.Router();
const control = require('./controller/taskController');


router.get('/tasks',  control.loadTasks);
router.post('/add', control.addTask);
router.post('/delete/:id', control.deleteTask);

module.exports = router;