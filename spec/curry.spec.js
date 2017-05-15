var expect = require('chai').expect;

var {curry, add, sub} = require('..');

describe('curry', function () {
  it('is a function', function () {
    expect(curry).to.be.a('function');
  });
  it('returns a function', function (){
    expect(curry(add, 3)).to.be.a('function');
  });
  it('curries a binary function with the passed argument', function () {
    expect(curry(add, 3)(2)).to.equal(add(3, 2));
    expect(curry(sub, 6)(8)).to.equal(sub(6, 8));
  });
  describe('ADVANCED', function () {
    it('works for any number of arguments', function () {
      function multiply5 (a, b, c, d, e) { return a * b * c * d * e }
      expect(curry(multiply5, 1, 2)(3, 4, 5)).to.equal(120);
      expect(curry(multiply5, 1, 2, 3)(4, 5)).to.equal(120);
    });
  });
});
