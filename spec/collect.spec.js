var expect = require('chai').expect;

var {collect, fromTo} = require('..');

describe('collect', function () {
  it('is a function', function () {
    expect(collect).to.be.a('function');
  });
  it('returns a function', function () {
    expect(collect()).to.be.a('function');
  });
  it('returns a generator that emits the values of the passed generator', function () {
    var gen = collect(fromTo(0, 3), []);
    expect(gen()).to.equal(0);
    expect(gen()).to.equal(1);
    expect(gen()).to.equal(2);
    expect(gen()).to.be.undefined;
  });
  it('collects the generated values in the passed array by mutating it', function () {
    var list = [];
    var gen = collect(fromTo(0, 3), list);
    expect(list).to.eql([]);
    gen();
    expect(list).to.eql([0]);
    gen();
    expect(list).to.eql([0, 1]);
    gen();
    expect(list).to.eql([0, 1, 2]);
    gen();
    expect(list).to.eql([0, 1, 2]);
  });
});