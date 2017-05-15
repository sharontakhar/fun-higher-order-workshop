var expect = require('chai').expect;

var {filter, fromTo} = require('..');

describe('filter', function () {
  it('is a function', function () {
    expect(filter).to.be.a('function');
  });
  it('returns a function', function () {
    expect(filter()).to.be.a('function');
  });
  it('emits the same values as the generator if passed a predicate that is always true', function () {
    function alwaysTrue () { return true; }
    var fil = filter(fromTo(0, 3), alwaysTrue);
    expect(fil()).to.equal(0);
    expect(fil()).to.equal(1);
    expect(fil()).to.equal(2);
    expect(fil()).to.be.undefined;
  });
  it('emits no values if passed a predicate that is always false', function () {
    function alwaysFalse () { return false; }
    var fil = filter(fromTo(0, 3), alwaysFalse);
    expect(fil()).to.be.undefined;
    expect(fil()).to.be.undefined;
    expect(fil()).to.be.undefined;
  });
  it('emits only the values that pass the predicate', function () {
    var onlyEven = function (n) {return n % 2 === 0;};
    var fil = filter(fromTo(0, 7), onlyEven);
    expect(fil()).to.equal(0);
    expect(fil()).to.equal(undefined);
    expect(fil()).to.equal(2);
    expect(fil()).to.equal(undefined);
    expect(fil()).to.equal(4);
    expect(fil()).to.equal(undefined);
    expect(fil()).to.equal(6);
    expect(fil()).to.equal(undefined);
  });
});
