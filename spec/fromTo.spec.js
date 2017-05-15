var expect = require('chai').expect;

var {fromTo} = require('..');

describe('fromTo', function () {
  it('is a function', function () {
    expect(fromTo).to.be.a('function');
  });
  it('returns a generator that emits consecutive integers between the first argument (inclusive) to the second argument (exclusive)', function () {
    var fromTwoToFive = fromTo(2, 5);
    expect(fromTwoToFive()).to.equal(2);
    expect(fromTwoToFive()).to.equal(3);
    expect(fromTwoToFive()).to.equal(4);
    expect(fromTwoToFive()).to.equal(undefined);
  });
});