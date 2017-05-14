/* eslint-env mocha */

const request = require('supertest');
const expect = require('expect');

var app = require('./server').app;

describe('Server', () => {
    // test express application
    describe('#GET /', () => {

        it('should return 404 response', (done) => {
            request(app)
                .get('/')
                .expect(404)
                .expect((res) => {
                    expect(res.body).toInclude({
                        error: 'Page not found.',
                        name: 'Todo App v1.0'
                    });
                })
                .end(done);
        });
    });

    describe('#GET /users', () => {
        it('should return my user object', (done) => {
            request(app)
                .get('/users')
                .expect(200)
                .expect((res) => {
                    expect(res.body).toInclude({
                        name: 'Furball',
                        age: 1
                    });
                })
                .end(done);
        });
    });
});
