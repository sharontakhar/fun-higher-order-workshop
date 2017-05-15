var expect = require('chai').expect;
var {fibonaccif} = require('..');

describe('fibonaccif', function () {
  it('is a function', function () {
    expect(fibonaccif).to.be.a('function');
  });
  it('returns a function', function () {
    expect(fibonaccif()).to.be.a('function');
  });
  it('returns a generator that emits fibonacci numbers starting from the passed arguments', function () {
    var fib = fibonaccif(2, 3);
    expect(fib()).to.equal(2);
    expect(fib()).to.equal(3);
    expect(fib()).to.equal(5);
    expect(fib()).to.equal(8);
    expect(fib()).to.equal(13);
  });
});