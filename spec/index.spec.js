const { expect } = require('chai');
const sinon = require('sinon');
const hof = require('../index');

describe('Higher Order Functions', () => {
  describe('Identity Functions', () => {
    describe('identity', () => {
      it('returns the first value passed as an argument', () => {
        expect(hof.identity(3)).to.equal(3);
        expect(hof.identity('winter')).to.equal('winter');
        expect(hof.identity(true)).to.be.true;
        expect(hof.identity(null)).to.be.null;
        expect(hof.identity()).to.be.undefined;
      });
      it('returns the first reference as the one passed as an argument', () => {
        const arr = ['Crono', 'Frog', 'Robo'];
        expect(hof.identity(arr)).to.equal(arr);
      });
    });
    describe('identityf', () => {
      it('returns a function', () => {
        expect(hof.identityf()).to.be.a('function');
      });
      it('returned function will return initial value', () => {
        const sixtyFour = hof.identityf(64);
        expect(sixtyFour()).to.equal(64);
      });
      it('returned function will return initial reference', () => {
        const teas = ['English Breakfast', 'Oolong', 'Jasmine'];
        const returnedTeas = hof.identityf(teas);
        expect(returnedTeas()).to.equal(teas);
      });
    });
  });

  describe('Binary Operations', () => {
    describe('add', () => {
      it('returns total of the two arguments', () => {
        expect(hof.add(56, 5)).to.be.equal(56 + 5);
        expect(hof.add(91, -71)).to.be.equal(91 + -71);
      });
    });
    describe('sub', () => {
      it('returns the difference of the second argument from the first', () => {
        expect(hof.sub(57, 10)).to.equal(57 - 10);
      });
    });
    describe('mul', () => {
      it('returns the product of two arguments', () => {
        expect(hof.mul(5, 30)).to.be.equal(5 * 30);
      });
    });
  });
  
  describe('Functions with multiple invocations', () => {
    describe('addf', () => {
      it('returns a function on first invocation', () => {
        expect(hof.addf(3)).to.be.a('function');
      });
      it('returns the total of both invocations', () => {
        expect(hof.addf(3)(4)).to.be.equal(7);
      });
      it('returned function is reusable', () => {
        const add100 = hof.addf(100);
        expect(add100(5)).to.be.equal(105);
        expect(add100(100)).to.be.equal(200);
        expect(add100(-100)).to.be.equal(0);
      });
    });
    describe('liftf', () => {
      it('returns a function on first invocation', () => {
        expect(hof.liftf(hof.add)).to.be.a('function');
      });
      it('returns a function on second invocation', () => {
        expect(hof.liftf(hof.add)(1)).to.be.a('function');
      });
      it('returns the result on third invocation (so that the binary function is callable with two invocations)', () => {
        expect(hof.liftf(hof.add)(1)(6)).to.be.equal(hof.add(1, 6));
        expect(hof.liftf(hof.mul)(5)(6)).to.be.equal(hof.mul(5, 6));
      });
    });

    describe('curry', () => {
      it('will take a binary function and a single value as arguments and return a function', () => {
        expect(hof.curry(hof.add, 5)).to.be.a('function');
      });
      it('second invocation will return the result', () => {
        const timesByThirty = hof.curry(hof.mul, 30);
        expect(timesByThirty(6)).to.equal(hof.mul(30, 6));
      });
    });
    describe('inc', () => {
      it('increments the passed argument by 1', () => {
        expect(hof.inc(0)).to.equal(1);
        expect(hof.inc(-3)).to.equal(-2);
      });
    });
  });

  describe('Unary Functions', () => {
    describe('twice', () => {
      it('returns a function on first invocation', () => {
        const double = hof.twice(hof.add);
        expect(double).to.be.a('function');
      });
      it('returns the value on second invocation', () => {
        const double = hof.twice(hof.add);
        expect(double(3)).to.equal(hof.add(3, 3));
      });
    });
    describe('composeu', () => {
      it('returns a function on first invocation', () => {
        const add100 = x => x + 100;
        const add50 = x => x + 50;
        const add150 = hof.composeu(add100, add50);
        expect(add150).to.be.a('function');
      });
      it('returns a value of given function on second invocation', () => {
        const square = x => x * x;
        const double = x => x + x;
        const squareThenDouble = hof.composeu(square, double);
        const doubleThenSquare = hof.composeu(double, square);
        expect(squareThenDouble(5)).to.equal(50);
        expect(doubleThenSquare(5)).to.equal(100);
      });
    });
    describe('composeb', () => {
      it('returns a function on first invocation', () => {
        const add2NumsMultiplyBy3rd = hof.composeb(hof.add, hof.mul);
        expect(add2NumsMultiplyBy3rd).to.be.a('function');
      });
      it('on second invocation, takes 3 values, using the first two for function #1 then using that returned value and the third parameter for function #2', () => {
        const add2NumsMultiplyBy3rd = hof.composeb(hof.add, hof.mul);
        expect(add2NumsMultiplyBy3rd(2, 3, 7)).to.equal(
          hof.mul(hof.add(2, 3), 7)
        );
      });
    });
    describe('limit', () => {
      it('returns a function on first invocation', () => {
        const addUseOnceOnly = hof.limit(hof.add, 1);
        expect(addUseOnceOnly).to.be.a('function');
      });
      it('on subsequent uses, returns value of original function when invoked less times than given limit', () => {
        const addUseLiberally = sinon.spy(hof.limit(hof.add, 108));
        expect(addUseLiberally(3, 1)).to.equal(4);
        expect(addUseLiberally(4, 4)).to.equal(8);
        expect(addUseLiberally(0, 15)).to.equal(15);
        expect(addUseLiberally(1, 15)).to.equal(16);
        expect(addUseLiberally(11, 12)).to.equal(23);
        expect(addUseLiberally(4, 38)).to.equal(42);
        expect(addUseLiberally.callCount).to.equal(6);
      });
      it('returns undefined when invoked more times than given limit', () => {
        const addUseScarcely = sinon.spy(hof.limit(hof.add, 3));
        expect(addUseScarcely(3, 1)).to.equal(4);
        expect(addUseScarcely.callCount).to.equal(1);
        expect(addUseScarcely(4, 4)).to.equal(8);
        expect(addUseScarcely.callCount).to.equal(2);
        expect(addUseScarcely(0, 15)).to.equal(15);
        expect(addUseScarcely.callCount).to.equal(3);
        expect(addUseScarcely(1, 15)).to.be.undefined;
        expect(addUseScarcely.callCount).to.equal(4);
        expect(addUseScarcely(11, 12)).to.be.undefined;
        expect(addUseScarcely.callCount).to.equal(5);
      });
    });
  });

  describe('Generator Functions', () => {
    describe('from', () => {
      it('returns a function on first invocation', () => {
        const index = hof.from();
        expect(index).to.be.a('function');
      });
      it('returns given value on first call', () => {
        const index = hof.from(0);
        expect(index()).to.equal(0);
      });
      it('Subsequent invocations emits consecutive integers', () => {
        const index = hof.from(0);
        expect(index()).to.equal(0);
        expect(index()).to.equal(1);
        expect(index()).to.equal(2);
      });
    });
    describe('to', () => {
      it('returns a function on first invocation', () => {
        const index = hof.to(hof.from(0), 5);
        expect(index).to.be.a('function');
      });
      it('returns given value on first call', () => {
        const index = hof.to(hof.from(0), 5);
        expect(index()).to.equal(0);
      });
      it('Subsequent invocations emits consecutive integers', () => {
        const index = hof.to(hof.from(0), 2);
        expect(index()).to.equal(0);
        expect(index()).to.equal(1);
      });
      it('exclusively emits undefined when surpassed limit (not inclusive)', () => {
        const index = hof.to(hof.from(0), 2);
        expect(index()).to.equal(0);
        expect(index()).to.equal(1);
        expect(index()).to.be.undefined;
        expect(index()).to.be.undefined;
      });
    });
    describe('fromTo', () => {
      it('returns a function on first invocation', () => {
        const index = hof.fromTo(0, 5);
        expect(index).to.be.a('function');
      });
      it('returns given value on first call', () => {
        const index = hof.fromTo(0, 5);
        expect(index()).to.equal(0);
      });
      it('Subsequent invocations emits consecutive integers', () => {
        const index = hof.fromTo(0, 2);
        expect(index()).to.equal(0);
        expect(index()).to.equal(1);
      });
      it('exclusively emits undefined when surpassed limit (not inclusive)', () => {
        const index = hof.fromTo(0, 2);
        expect(index()).to.equal(0);
        expect(index()).to.equal(1);
        expect(index()).to.be.undefined;
        expect(index()).to.be.undefined;
      });
    });
    describe('element', () => {
      it('on first invocation will return a function', () => {
        const ele = hof.element([], hof.fromTo(0, 1));
        expect(ele).to.be.a('function');
      });
      it('returns the element at the given index', () => {
        const fbiAgents = ['Dale Cooper', 'Phillip Jeffries', 'Gordon Cole'];
        const ele = hof.element(fbiAgents, hof.fromTo(1, 4));
        expect(ele()).to.be.equal('Phillip Jeffries');
        expect(ele()).to.be.equal('Gordon Cole');
      });
      it('defaults to the beginning of the index when no generator is given', () => {
        const blackLodge = ['BOB', 'MIKE', 'The Giant'];
        const ele = hof.element(blackLodge);
        expect(ele()).to.be.equal('BOB');
        expect(ele()).to.be.equal('MIKE');
        expect(ele()).to.be.equal('The Giant');
      });
    });
    describe('collect', () => {
      it('returns a function', () => {
        expect(hof.collect()).to.be.a('function');
      });
      it('returns a generator that emits the values of the passed generator', () => {
        const gen = hof.collect(hof.fromTo(0, 3), []);
        expect(gen()).to.equal(0);
        expect(gen()).to.equal(1);
        expect(gen()).to.equal(2);
        expect(gen()).to.be.undefined;
      });
      it('collects the generated values in the passed array by mutating it', () => {
        const list = [];
        const gen = hof.collect(hof.fromTo(0, 3), list);
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
    describe('filter', () => {
      it('returns a function', () => {
        expect(hof.filter()).to.be.a('function');
      });
      it('emits the same values as the generator if passed a predicate that is always true', () => {
        const alwaysTrue = () => true;
        const fil = hof.filter(hof.fromTo(0, 3), alwaysTrue);
        expect(fil()).to.equal(0);
        expect(fil()).to.equal(1);
        expect(fil()).to.equal(2);
        expect(fil()).to.be.undefined;
      });
      it('emits no values if passed a predicate that is always false', () => {
        const alwaysFalse = () => false;
        const fil = hof.filter(hof.fromTo(0, 3), alwaysFalse);
        expect(fil()).to.be.undefined;
        expect(fil()).to.be.undefined;
        expect(fil()).to.be.undefined;
      });
      it('emits only the values that pass the predicate', () => {
        const onlyEven = n => n % 2 === 0;
        const fil = hof.filter(hof.fromTo(0, 7), onlyEven);
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
    describe('concat', () => {
      it('returns a function', () => {
        const con = hof.concat(hof.fromTo(0, 3), hof.fromTo(0, 2));
        expect(con).to.be.a('function');
      });
      it('returns outputs of both given generators', () => {
        const ducks = [
          'Scrooge McDuck',
          'The Ugly Duckling',
          'The Howard the Duck'
        ];
        const ele = hof.element(ducks);
        const con = hof.concat(hof.fromTo(0, 2), ele);
        expect(con()).to.be.equal(0);
        expect(con()).to.be.equal(1);
        expect(con()).to.be.equal('Scrooge McDuck');
        expect(con()).to.be.equal('The Ugly Duckling');
        expect(con()).to.be.equal('The Howard the Duck');
        expect(con()).to.be.undefined;
      });
      it('emits all the values from the passed generator if only one is passed', () => {
        const gen = hof.concat(hof.fromTo(0, 3));
        expect(gen()).to.equal(0);
        expect(gen()).to.equal(1);
        expect(gen()).to.equal(2);
        expect(gen()).to.be.undefined;
      });
    });
  });

  describe('gensym Functions', () => {
    describe('gensymf', () => {
      it('returns a function on first invocation', () => {
        expect(hof.gensymf('A')).to.be.a('function');
      });
      it('gives a unique symbol on subsequent invocations', () => {
        const gensym = hof.gensymf('A');
        expect(gensym()).to.equal('A0');
        expect(gensym()).to.equal('A1');
      });
      it('counters will be seperate for each designated symbol', () => {
        const genA = hof.gensymf('A');
        const genB = hof.gensymf('B');
        expect(genA()).to.equal('A0');
        expect(genB()).to.equal('B0');
        expect(genB()).to.equal('B1');
        expect(genA()).to.equal('A1');
        expect(genB()).to.equal('B2');
        expect(genB()).to.equal('B3');
        expect(genA()).to.equal('A2');
      });
    });
    describe('gensymff', () => {
      it('returns a function', () => {
        const gensymf = hof.gensymff(hof.inc, 0);
        expect(gensymf).to.be.a('function');
      });
      it('giving inc() and a seed will mimic gensymf behaviours ', () => {
        const gensymf = hof.gensymff(hof.inc, -1);
        const genA = gensymf('A');
        const genB = gensymf('B');
        expect(genA()).to.equal('A0');
        expect(genB()).to.equal('B0');
        expect(genB()).to.equal('B1');
        expect(genA()).to.equal('A1');
        expect(genB()).to.equal('B2');
        expect(genB()).to.equal('B3');
        expect(genA()).to.equal('A2');
      });
    });
  });

  describe('Object Methods', () => {
    describe('counter', () => {
      it('returns an object', () => {
        const obj = hof.counter(10);
        expect(obj).to.be.a('object');
      });
      it('returned object has an up method', () => {
        const obj = hof.counter(10);
        expect(obj)
          .to.have.property('up')
          .and.be.a('function');
      });
      it('up method will return an incrememented count', () => {
        const obj = hof.counter(10);
        expect(obj.up()).to.equal(11);
      });
      it('returned object has an down method', () => {
        const obj = hof.counter(10);
        expect(obj)
          .to.have.property('down')
          .and.be.a('function');
      });
      it('down method will return an decreased count', () => {
        const obj = hof.counter(10);
        expect(obj.down()).to.equal(9);
      });
      it('state will be shared by methods within object', () => {
        const obj = hof.counter(10);
        expect(obj.up()).to.equal(11);
        expect(obj.down()).to.equal(10);
        expect(obj.down()).to.equal(9);
      });
      it('hides the state of the counter, i.e. the returned object only has the "up" and "down" methods', () => {
        expect(hof.counter(20)).to.have.all.keys(['up', 'down']);
      });
    });
    describe('revoke', () => {
      it('returns an object', () => {
        const obj = hof.revokable(hof.add);
        expect(obj).to.be.a('object');
      });
      it('returned object has an invoke method', () => {
        const obj = hof.revokable(hof.add);
        expect(obj)
          .to.have.property('invoke')
          .and.be.a('function');
      });
      it('returned object has an revoke method', () => {
        const obj = hof.revokable(hof.add);
        expect(obj)
          .to.have.property('revoke')
          .and.be.a('function');
      });
      it('invoke will allow use of passed binary function', () => {
        const add = hof.revokable(hof.add);
        expect(add.invoke).to.be.a('function');
        expect(add.invoke(3, 4)).to.equal(hof.add(3, 4));
      });
      it('after revoke is called, passed function will return undefined in subsequent calls', () => {
        const add = hof.revokable(hof.add);
        expect(add.invoke(3, 4)).to.equal(hof.add(3, 4));
        add.revoke();
        expect(add.invoke(3, 4)).to.be.undefined;
      });
    });
  });
});

describe('Advanced Functionality', () => {
  describe('curry', () => {
    it('works for any number of arguments', () => {
      const multiply5Numbers = (a, b, c, d, e) => a * b * c * d * e;
      expect(hof.curry(multiply5Numbers, 1, 2)(3, 4, 5)).to.equal(120);
      expect(hof.curry(multiply5Numbers, 1, 2, 3)(4, 5)).to.equal(120);
    });
  });
  describe('composeu', () => {
    it('works for any number of arguments', () => {
      const square = x => x * x;
      const double = x => x + x;
      const doubleSquareDouble = hof.composeu(double, square, double);
      const doubleFourTimes = hof.composeu(double, double, double, double);
      expect(doubleSquareDouble(2)).to.equal(double(square(double(2))));
      expect(doubleFourTimes(3)).to.equal(
        double(double(double(double(3))))
      );
    });
  });

  describe('concat', () => {
    it('returns undefined if no generators were passed', () => {
      const gen = hof.concat();
      expect(gen()).to.be.undefined;
    });
    it('works for more than two arguments', () => {
      const gen = hof.concat(
        hof.fromTo(0, 2),
        hof.fromTo(2, 4),
        hof.fromTo(4, 6)
      );
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
