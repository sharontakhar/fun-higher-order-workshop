var expect = require('chai').expect;

var {inc} = require('..');

describe('inc', function () {
  it('is a function', function () {
    expect(inc).to.be.a('function');
  });
  it('increments the passed argument by 1', function () {
    expect(inc(0)).to.equal(1);
    expect(inc(-3)).to.equal(-2);
  });
});