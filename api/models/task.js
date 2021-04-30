const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const taskSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
   
    task: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        required: false
    }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;