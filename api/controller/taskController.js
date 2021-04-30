const Task = require('../models/task');

const addTask = (req, res) => {
    const userTask = req.body.taskName;
    const user = req.session.user;
    if (userTask != '') {

    
    const newTask = new Task({
        task: userTask,
        user,
        complete: false

    });
    newTask.save().then(task => {
        console.log(`${task} added`);
        

    }).catch(err => console.log(err)); 
}
    
};

const deleteTask =  (req, res) => {
    Task.deleteOne({task: req.body.val}, (err) => {
        
        if (err) console.log(err);
        console.log('task deleted');
        
        
    })
    



};

const loadTasks =  (req, res) => {
    const user = req.session.user;
    Task.find({user}, (err, docs) => {
        if (err) console.log(err);
        res.json(docs);
    });
};

const completed = async (req, res) => {
    let checked = req.body.box;
    let user = req.session.user;
    let task = req.body.val;
  
    
    
    const response = await Task.updateOne({user:user, task:task, complete: !checked}, {$set: {
        complete: checked
    } } );
    console.log(response);
 

  
     
  
}

module.exports = {
    loadTasks,
    addTask,
    deleteTask,
    completed
};