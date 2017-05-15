var expect = require('chai').expect;

var {liftf, sub, mul} = require('..');

describe('liftf', function () {
  it('is a function', function () {
    expect(liftf).to.be.a('function');
  });
  it('returns a function', function () {
    expect(liftf()).to.be.a('function');
  });
  it('returns a function that returns a function', function () {
    expect(liftf()).to.be.a('function');
  });
  it('makes a binary function callable with 2 invocations', function () {
    var subf = liftf(sub);
    expect(subf(3)(2)).to.equal(sub(3, 2));
    var mulf = liftf(mul);
    expect(mulf(5)(9)).to.equal(mul(5, 9));
  });
});
