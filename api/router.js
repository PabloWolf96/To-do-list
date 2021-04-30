const express = require('express');
const router = express.Router();
const control = require('./controller/taskController');


router.get('/tasks',  control.loadTasks);
router.post('/add', control.addTask);
router.post('/delete', control.deleteTask);
router.post('/complete', control.completed);

module.exports = router;