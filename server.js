const express = require('express')
const app = express()

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/tasks', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// allow express to display json
app.use(express.json());

app.use(express.static(__dirname + '/public/dist/public'));

const TaskSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    }
}, {timestamps: true });

const Task = mongoose.model('Task', TaskSchema);

// serve up the full collection of tasks
app.get('/tasks', (req, res) => {
    Task.find()
        .then(task => res.json(task))
        .catch(err => res.json(err));
});

// create a new task
app.post('/tasks', (req, res) => {
    Task.create(req.body)
        .then(task => {
            res.json(task)
        })
        .catch(err => res.json(err));
})

// bring up the document of that particular task
app.get('/tasks/:id', (req, res) => {
    Task.findById(req.params.id)
        .then(task => res.json(task))
        .catch(err => res.json(err));
})

// update a task
app.put('/tasks/:id/', (req, res) => {
    Task.updateOne({
            _id: req.params.id
        }, {$set: {title: req.body.title, description: req.body.description, completed : req.body.completed}}
        )
        .then(() => {
            res.redirect('/tasks')
        })
        .catch(err => res.json(err));
})

// delete a task from the database
app.delete('/tasks/:id/', (req, res) => {
    Task.deleteOne({
            _id: req.params.id
        })
        .then(() => {
            res.redirect('/tasks')
        })
        .catch(err => res.json(err));
})


app.listen(3333, () => console.log("we lit on 3333"))