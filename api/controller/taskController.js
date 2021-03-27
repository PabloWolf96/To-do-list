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
        user,
        complete: false

    });
    newTask.save().then(task => {
        res.redirect('/todo');
        

    }).catch(err => console.log(err)); 
}
    
};

const deleteTask = (req, res) => {
    Task.findOneAndDelete({id: req.params.id}, (err) => {
        
        if (err) console.log(err);
        console.log('task deleted');
        res.redirect('/todo');
        
        
    });
    



};

const loadTasks = (req, res) => {
    const user = req.session.user;
    Task.find({user}, (err, docs) => {
        if (err) console.log(err);
        res.json(docs);
    });
};

const completed = (req, res) => {
    let checked = req.body.box;
    if (checked) {
        Task.findOneAndUpdate({id: req.body.id}, {complete: true}, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            }
        });
  
    } else {
        Task.findOneAndUpdate({id: req.body.id}, {complete: false}, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            }
        });

    }

}

module.exports = {
    loadTasks,
    addTask,
    deleteTask,
    completed
};