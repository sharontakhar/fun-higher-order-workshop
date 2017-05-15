var expect = require('chai').expect;

var {identityf} = require('..');

describe('identityf', function () {
  it('is a function', function () {
    expect(identityf).to.be.a('function');
  });
  it('returns a function', function () {
    expect(identityf()).to.be.a('function');
  });
  it('returns a function that in turn returns the passed argument', function () {
    var three = identityf(3);
    expect(three()).to.equal(3);
  });
});