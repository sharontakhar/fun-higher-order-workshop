var expect = require('chai').expect;
var {revokable, mul} = require('..');

describe('revokable', function () {
  it('is a function', function () {
    expect(revokable).to.be.a('function');
  });
  it('returns an object', function () {
    expect(revokable()).to.be.an('object');
  });
  it('returns an object with an "invoke" method that can invoke the passed binary function', function () {
    var mul_rev = revokable(mul);
    expect(mul_rev.invoke(2, 3)).to.equal(mul(2, 3));
  });
  it('returns an object with a "revoke" method that disables the "invoke" method from returning values', function () {
    var mul_rev = revokable(mul);
    expect(mul_rev.invoke(2, 3)).to.equal(mul(2, 3));
    mul_rev.revoke();
    expect(mul_rev.invoke(3, 4)).to.be.undefined;
  });
});