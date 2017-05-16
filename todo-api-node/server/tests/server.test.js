/* eslint-env mocha */

const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

// run before every test case
beforeEach((done) => {
    Todo.remove({}).then(() => done()); // empty database
});

// POST: /todos
describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((err) => done(err));
            });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                Todo.find().then((todo) => {
                    expect(todo.length).toBe(0);
                    done();
                }).catch((err) => done(err));
            });
    });
});
