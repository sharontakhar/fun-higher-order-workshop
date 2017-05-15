var expect = require('chai').expect;
var {gensymf} = require('..');

describe('gensymf', function () {
  it('is a function', function () {
    expect(gensymf).to.be.a('function');
  });
  it('returns a function', function () {
    expect(gensymf()).to.be.a('function');
  });
  it('returns a generator that emits unique strings starting with the passed argument', function () {
    var genNC = gensymf('NC');
    expect(genNC()).to.equal('NC1');
    expect(genNC()).to.equal('NC2');
    expect(genNC()).to.equal('NC3');
    expect(genNC()).to.equal('NC4');
    expect(genNC()).to.equal('NC5');
  });
});