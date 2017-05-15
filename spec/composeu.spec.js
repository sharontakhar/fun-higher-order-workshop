var expect = require('chai').expect;

var {composeu, twice, add, mul} = require('..');

describe('composeu', function () {
  var double = twice(add);
  var square = twice(mul);

  it('is a function', function () {
    expect(composeu).to.be.a('function');
  });
  it('returns a function', function () {
    expect(composeu()).to.be.a('function');
  });
  it('the returned function composes the passed unary functions, passing the result of the first function as the argument to the second function', function () {
    var doubleThenSquare = composeu(double, square);
    var squareThenDouble = composeu(square, double);
    expect(doubleThenSquare(3)).to.equal(square(double(3)));
    expect(squareThenDouble(4)).to.equal(double(square(4)));
  });
  describe('ADVANCED', function () {
    it('works for any number of arguments', function () {
      var doubleSquareDouble = composeu(double, square, double);
      var doubleFourTimes = composeu(double, double, double, double);
      expect(doubleSquareDouble(2)).to.equal(double(square(double(2))));
      expect(doubleFourTimes(3)).to.equal(double(double(double(double(3)))));
    });
  });
});
