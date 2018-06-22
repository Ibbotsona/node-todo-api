// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) {
    return console.log('Unable to connect to MongoDB server')
  }
  console.log('Connected to MongoDB server');

  // deleteMany
  // db.collection('Todos').deleteMany({text: 'Eat Lunch'}).then((result) => {
  //   console.log(result);
  // });

  // deleteOne
  // db.collection('Todos').deleteOne({ text: 'Eat Lunch' }).then((result) => {
  //   console.log(result);
  // });

  // findOneAndDelete
  // db.collection('Todos').findOneAndDelete({ text: 'Eat Lunch' }).then((result) => {
  //   console.log(result);
  // });

  // delete duplcate records in users using deleteMany
  // db.collection('Users').deleteMany({name: 'Antony'})
  // .then((result) => {
  //   console.log(result);
  // }); 

  // find one records by _id in users then delete
  db.collection('Users').findOneAndDelete({
    _id: new ObjectID("5b2d68fa81ee9937dd29a29d")
  }).then((results) => {
    console.log(JSON.stringify(results, undefined, 2));
  });

  // db.close();
});