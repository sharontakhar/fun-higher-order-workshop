var expect = require('chai').expect;

var {from} = require('..');

describe('from', function () {
  it('is a function', function () {
    expect(from).to.be.a('function');
  });
  it('emits consecutive integers starting from the passed argument', function () {
    var generator = from(-2);
    expect(generator()).to.equal(-2);
    expect(generator()).to.equal(-1);
    expect(generator()).to.equal(0);
    expect(generator()).to.equal(1);
  });
});

