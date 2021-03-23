const Task = require('../models/task');
const uuid = require('uuid');

const addTask = (req, res) => {
    const userTask = req.body.task_name;
    const user = req.session.user;
    const taskId = uuid.v4();
    if (userTask != '') {

    
    const newTask = new Task({
        id: taskId,
        task: userTask,
        user
    });
    newTask.save().then(task => {
        res.render('to-do');
        

    }).catch(err => console.log(err)); 
}
    
};

const deleteTask = (req, res) => {
    console.log(req.param('id'));
    Task.findOneAndDelete({id: req.param('id')}, (err) => {
        
        if (err) console.log(err);
        console.log('task deleted');
        res.render('to-do');
        
        
    });
    



};

const loadTasks = (req, res) => {
    const user = req.session.user;
    Task.find({user}, (err, docs) => {
        if (err) console.log(err);
        res.json(docs);
    });
};

module.exports = {
    loadTasks,
    addTask,
    deleteTask
};