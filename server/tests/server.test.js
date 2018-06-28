const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

let {app} = require('./../server');
let {Todo} = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: 'First Test Todo'
},
{
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos', () => {
  
  it('should create a new todo', (done) => {
    let text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('Should not create todo with invalid body data', (done) => {

    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if(err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /todos', () => {
  
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      }).end(done);
  })
});

describe('GET /todos/:id', () => {

  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    let hexId = new ObjectID().toHexString();

    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get('/todos/123abc')
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    let hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexId).then((todo) => {
          expect(todo).toBeFalsy();
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return 404 if todo not found', (done) => {
    let hexId = new ObjectID().toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id is invalid', (done) => {
    request(app)
      .delete('/todos/123abc')
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos:id', () => {

  it('should update the todo', (done) => {
    const hexId = todos[0]._id.toHexString();
    const updatedTodo = {
        text: "UPDATED something to do",
        completed: true
      }

    request(app)
      .patch(`/todos/${hexId}`)
      .send(updatedTodo)
      .expect(200)
      // custom assertation- text is changed, completed is true, completedAt is a number .toBeA
        .expect((res) => {
          expect(res.body.todo.text).toEqual(updatedTodo.text);
          expect(res.body.todo.completed).toBeTruthy();
          expect(typeof res.body.todo.completedAt).toBe('number');
        })
        .end(done);
      });
 

   it('should clear completedAt when todo is not completed', (done) => {
     const hexId = todos[1]._id.toHexString();
     const updatedTodo = {
       text: "UPDATED2 something to do",
       complete: false,
       completedAt: null
     }

    request(app)
      .patch(`/todos/${hexId}`)
      .send(updatedTodo)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toEqual(updatedTodo.text);
        expect(res.body.todo.completed).toBeFalsy();
        expect(res.body.todo.completedAt).toBeNull() ;
      })
      .end(done);
      });
  });