var expect = require('chai').expect;

var {composeb, add, mul} = require('..');

describe('composeb', function () {
  it('is a function', function () {
    expect(composeb).to.be.a('function');
  });
  it('returns a function', function () {
    expect(composeb()).to.be.a('function');
  });
  it('the returned function composes the two passed binary functions, passing the result of the first function as the first argument to the second function', function () {
    var result = composeb(add, mul)(2, 3, 5);
    var expectedResult = mul(add(2, 3), 5);
    expect(result).to.equal(expectedResult);
  });
});