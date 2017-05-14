/* eslint-env mocha */

const expect = require('expect');
const rewire = require('rewire');

var app = rewire('./app');

describe('App', () => {
    // mock db
    var db = {
        saveUser: expect.createSpy()
    };
    app.__set__('db', db);

    it('should call the spy correctly', () => {
        var spy = expect.createSpy();
        spy('Leon', 28);
        expect(spy).toHaveBeenCalledWith('Leon', 28);
    });

    it('should call saveUser with user object', () => {
        var email = 'tsoliangwu0130@gmail.com';
        var password = '123abc';

        app.handleSignup(email, password);
        expect(db.saveUser).toHaveBeenCalledWith({ email, password });
    });
});
