var expect = require('chai').expect;

var {add, sub, mul} = require('..');

describe('binaries', function () {
  describe('add', function () {
    it('is a function', function () {
      expect(add).to.be.a('function');
    });
    it('returns the sum of the two passed arguments', function () {
      expect(add(14, 77)).to.equal(14 + 77);
    });
  });
  describe('sub', function () {
    it('is a function', function () {
      expect(sub).to.be.a('function');
    });
    it('returns the difference between the two passed arguments', function () {
      expect(sub(65, 108)).to.equal(65 - 108);
    });
  });
  describe('mul', function () {
    it('is a function', function () {
      expect(mul).to.be.a('function');
    });
    it('returns the product of the two passed arguments', function () {
      expect(mul(8, -2)).to.equal(8 * -2);
    });
  });
});