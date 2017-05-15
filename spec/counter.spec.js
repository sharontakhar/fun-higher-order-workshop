var expect = require('chai').expect;
var {counter} = require('..');

describe('counter', function () {
  it('is a function', function () {
    expect(counter).to.be.a('function');
  });
  it('returns an object', function () {
    expect(counter()).to.be.an('object');
  });
  it('returns a generator with an up() method that emits and increments the internal counter value', function () {
    var c = counter(10);
    expect(c.up()).to.equal(11);
    expect(c.up()).to.equal(12);
    expect(c.up()).to.equal(13);
  });
  it('returns a generator with a down() method that emits and decrements the internal counter value', function () {
    var c = counter(20);
    expect(c.down()).to.equal(19);
    expect(c.down()).to.equal(18);
    expect(c.down()).to.equal(17);
  });
  it('alternating the up and down methods updates the internal counter value correctly', function () {
    var c = counter(5);
    expect(c.down()).to.equal(4);
    expect(c.up()).to.equal(5);
    expect(c.up()).to.equal(6);
    expect(c.down()).to.equal(5);
  });
  it('hides the state of the counter, i.e. the returned object only has the "up" and "down" methods', function () {
    expect(counter(20)).to.have.all.keys(['up', 'down']);
  });
});