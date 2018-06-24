const {ObjectID} = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// let id = '5b2f8676ec8e1e2c5cda595511';

// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos: ', todos);
// });

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todos: ', todo);
// });

// Todo.findById(id).then((todo) => {
//   if(!todo) {
//     return console.log('ID not found');
//   }
//   console.log('Todo By ID: ', todo);
// }).catch((e) => console.log(e));

// query users collection by ID
// Load in User mongoose model
// use findbyid to find user
// handle 3 cases
  // user not found
  // user found - print user
  // handle any errors, print error obj

let userId = '5b2e6e228bd733272082ae0b';


User.findById(userId).then((user) => {
  if(!user) {
    return console.log('User not found');
  }


  console.log('User : ', JSON.stringify(user, undefined, 2));
}).catch((e) => console.log('Incorrect ID format', e));
