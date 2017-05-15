var expect = require('chai').expect;

var {addf, add} = require('..');

describe('addf', function () {
  it('is a function', function () {
    expect(addf).to.be.a('function');
  });
  it('returns a function', function () {
    expect(addf()).to.be.a('function');
  });
  it('adds two numbers in two invocations', function () {
    expect(addf(2)(3)).to.equal(add(2, 3));
  });
});