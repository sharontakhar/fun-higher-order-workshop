var expect = require('chai').expect;

var {identity} = require('..');

describe('identity', function () {
  it('is a function', function () {
    expect(identity).to.be.a('function');
  });
  it('returns the argument that was passed to it', function () {
    expect(identity(42)).to.equal(42);
    expect(identity('hello')).to.equal('hello');
    expect(identity(true)).to.be.true;
    expect(identity()).to.be.undefined;
    expect(identity(null)).to.be.null;
    var obj = [1, 2, 3];
    expect(identity(obj)).to.equal(obj);
  });
});