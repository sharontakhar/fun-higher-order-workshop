var expect = require('chai').expect;

var {concat, fromTo} = require('..');

describe('concat', function () {
  it('is a function', function () {
    expect(concat).to.be.a('function');
  });
  it('returns a function', function () {
    expect(concat()).to.be.a('function');
  });
  it('emits all the values from the passed generator if only one is passed', function () {
    var gen = concat(fromTo(0, 3));
    expect(gen()).to.equal(0);
    expect(gen()).to.equal(1);
    expect(gen()).to.equal(2);
    expect(gen()).to.be.undefined;
  });
  it('emits all the values from the 2nd passed generator after all the values from the 1st one have been emitted', function () {
    var gen = concat(fromTo(0, 2), fromTo(2, 5));
    expect(gen()).to.equal(0);
    expect(gen()).to.equal(1);
    expect(gen()).to.equal(2);
    expect(gen()).to.equal(3);
    expect(gen()).to.equal(4);
    expect(gen()).to.be.undefined;
  });
  describe('ADVANCED', function () {
    it('returns undefined if no generators were passed', function () {
      var gen = concat();
      expect(gen()).to.be.undefined;
    });
    it('works for more than two arguments', function () {
      var gen = concat(fromTo(0, 2), fromTo(2, 4), fromTo(4, 6));
      expect(gen()).to.equal(0);
      expect(gen()).to.equal(1);
      expect(gen()).to.equal(2);
      expect(gen()).to.equal(3);
      expect(gen()).to.equal(4);
      expect(gen()).to.equal(5);
      expect(gen()).to.be.undefined;
    });
  });
});
