const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/TodoApp');
mongoose.connect('mongodb://admin:letmein123@ds219051.mlab.com:19051/todo-app-api');

module.exports = {mongoose};