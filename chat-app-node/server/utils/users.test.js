/* eslint-env mocha */

const expect = require('expect');

var { Users } = require('./users');

describe('Users', () => {
    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: 123,
            name: 'Leon',
            room: 'The Office Fans'
        };

        users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });
});
