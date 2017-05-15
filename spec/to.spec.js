var expect = require('chai').expect;

var {to, from} = require('..');

describe('to', function () {
  it('is a function', function () {
    expect(to).to.be.a('function');
  });
  it('emits consecutive integers from the passed generator up to the value of the second passed argument (not inclusive)', function () {
    var fromOne = from(1);
    var upToThree = to(fromOne, 3);
    expect(upToThree()).to.equal(1);
    expect(upToThree()).to.equal(2);
    expect(upToThree()).to.equal(undefined);
  });
});
