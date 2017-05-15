var expect = require('chai').expect;
var sinon = require('sinon');

var {limit, add} = require('..');

describe('limit', function () {
  it('is a function', function () {
    expect(limit).to.be.a('function');
  });
  it('returns a function', function () {
    expect(limit()).to.be.a('function');
  });
  it('the returned function does the same as the passed argument', function () {
    var add_ltd = limit(add, 1);
    expect(add_ltd(2, 3)).to.equal(add(2, 3));
  });
  it('the returned function can only be called a number of times equal to the 2nd passed argument', function () {
    var addSpy = sinon.spy(add);
    var limitedAdd = limit(addSpy, 2);
    expect(limitedAdd(1, 2)).to.equal(add(1, 2));
    expect(limitedAdd(2, 3)).to.equal(add(2, 3));
    expect(limitedAdd(3, 4)).to.be.undefined;
    expect(addSpy.calledTwice).to.be.true;
  });
});