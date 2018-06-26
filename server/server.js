let express = require('express');
let bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');


const {mongoose} = require('./db/mongoose.js');
let { Todo } = require('./models/todo');
let { User } = require('./models/user');

let app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  let todo = new Todo({
    text: req.body.text
  });


  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  })
});


app.get('/todos/:id', (req, res) => {
  let id = req.params.id;

  if (!ObjectID.isValid(id)) {
    res.status(404).send('ID not valid');
  }
  
  Todo.findById(id).then((todo) => {
    if(!todo) {
      return res.status(404).send('ID not found');
    }

    res.status(200).send({todo});
  }, (e) => { 
    res.send('');
});
});

app.delete('/todos/:id', (req, res) => {
  let id = req.params.id;

  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send('Unable to delete - No todo with specified ID found');
    }

    res.send(todo);
  }).catch((e) => {
    res.status(400).send();
    });
  });



app.listen(port, () => {
  console.log(`Server has started on port ${port}...`);
});

module.exports = {app};