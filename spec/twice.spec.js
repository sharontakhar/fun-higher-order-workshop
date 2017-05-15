var expect = require('chai').expect;

var {twice, add, mul} = require('..');

describe('twice', function () {
  it('is a function', function () {
    expect(twice).to.be.a('function');
  });
  it('returns a function', function () {
    expect(twice()).to.be.a('function');
  });
  it('the returned function calls the passed function with the passed argument twice', function () {
    var double = twice(add);
    var square = twice(mul);
    expect(double(3)).to.equal(add(3, 3));
    expect(square(3)).to.equal(mul(3, 3));
  });
});