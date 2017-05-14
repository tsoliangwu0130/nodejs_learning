/* eslint-env mocha */

const expect = require('expect');

const utils = require('./utils');

// test some functions
it('should add two numbers', () => {
    var res = utils.add(33, 11);

    expect(res).toBe(44).toBeA('number');
});

it('should squre a number', () => {
    var res = utils.square(9);

    expect(res).toBe(81).toBeA('number');
});

it('should expect some values', () => {
    expect(12).toNotBe(11);
    expect({ name: 'Leon' }).toNotEqual({ name: 'leon' }); // objects check
    expect([1, 2, 3]).toInclude(3);
    expect([1, 2, 3]).toExclude(5);
    expect({
        name: 'Leon',
        age: 28,
        location: 'Corvallis'
    }).toInclude({
        age: 28
    });
});

it('should set first and last names', () => {
    var user = {
        location: 'Corvallis',
        age: 28
    };
    var res = utils.setName(user, 'Tso-Liang Wu');

    expect(res).toInclude({
        firstName: 'Tso-Liang',
        lastName: 'Wu'
    });
});

// test async functions
it('should async add two numbers', (done) => {
    utils.asyncAdd(4, 3, (sum) => {
        expect(sum).toBe(7).toBeA('number');
        done();
    });
});

it('should async square a number', (done) => {
    utils.asyncSquare(5, (sqr) => {
        expect(sqr).toBe(25).toBeA('number');
        done();
    });
});
