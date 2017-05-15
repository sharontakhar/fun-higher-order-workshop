var expect = require('chai').expect;

var {reverse, sub} = require('..');

describe('reverse', function () {
  it('is a function', function () {
    expect(reverse).to.be.a('function');
  });
  it('returns a function', function () {
    expect(reverse()).to.be.a('function');
  });
  it('the returned function calls the passed function with its arguments reversed', function () {
    var sub_rev = reverse(sub);
    expect(sub_rev(4, 2)).to.equal(sub(2, 4));
  });
  describe('ADVANCED', function () {
    it('works for any number of arguments', function () {
      function sub3 (a, b, c) { return a - b - c; }
      expect(reverse(sub3)(1, 2, 3)).to.equal(sub3(3, 2, 1));
    });
  });
});