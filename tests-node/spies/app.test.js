/* eslint-env mocha */

const expect = require('expect');

describe('App', () => {
    it('should call the spy correctly', () => {
        var spy = expect.createSpy();
        spy('Leon', 28);
        expect(spy).toHaveBeenCalledWith('Leon', 28);
    });
});
