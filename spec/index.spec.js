const expect = require('chai').expect;
const sinon = require('sinon');

const hof = require('../index');

describe('higher order functions', function () {
  describe('identity', function () {
    it('is a function', function () {
      expect(hof.identity).to.be.a('function');
    });
    it('returns the value that was passed to it', function () {
      expect(hof.identity(42)).to.equal(42);
      expect(hof.identity('hello')).to.equal('hello');
      expect(hof.identity(true)).to.be.true;
      expect(hof.identity()).to.be.undefined;
      expect(hof.identity(null)).to.be.null;
    });
    it('returns the reference that was passed to it', function () {
      const obj = [1, 2, 3];
      expect(hof.identity(obj)).to.equal(obj);
    });
  });
  describe('identityf', function () {
    it('is a function', function () {
      expect(hof.identityf).to.be.a('function');
    });
    it('returns a function', function () {
      expect(hof.identityf()).to.be.a('function');
    });
    it('returns a function that in turn returns the passed argument', function () {
      const three = hof.identityf(3);
      expect(three()).to.equal(3);
    });
  });
  describe('binaries', function () {
    describe('add', function () {
      it('is a function', function () {
        expect(hof.add).to.be.a('function');
      });
      it('returns the sum of the two passed arguments', function () {
        expect(hof.add(14, 77)).to.equal(14 + 77);
      });
    });
    describe('sub', function () {
      it('is a function', function () {
        expect(hof.sub).to.be.a('function');
      });
      it('returns the difference between the two passed arguments', function () {
        expect(hof.sub(65, 108)).to.equal(65 - 108);
      });
    });
    describe('mul', function () {
      it('is a function', function () {
        expect(hof.mul).to.be.a('function');
      });
      it('returns the product of the two passed arguments', function () {
        expect(hof.mul(8, -2)).to.equal(8 * -2);
      });
    });
  });

  describe('addf', function () {
    it('is a function', function () {
      expect(hof.addf).to.be.a('function');
    });
    it('returns a function', function () {
      expect(hof.addf()).to.be.a('function');
    });
    it('adds two numbers in two invocations', function () {
      expect(hof.addf(2)(3)).to.equal(5);
    });
  });
  describe('liftf', function () {
    it('is a function', function () {
      expect(hof.liftf).to.be.a('function');
    });
    it('returns a function', function () {
      expect(hof.liftf()).to.be.a('function');
    });
    it('returns a function that returns a function', function () {
      expect(hof.liftf()()).to.be.a('function');
    });
    it('makes a binary function callable with 2 invocations', function () {
      const subf = hof.liftf(hof.sub);
      expect(subf(3)(2)).to.equal(1);
      const mulf = hof.liftf(hof.mul);
      expect(mulf(5)(9)).to.equal(45);
    });
  });
  describe('curry', function () {
    it('is a function', function () {
      expect(hof.curry).to.be.a('function');
    });
    it('returns a function', function (){
      expect(hof.curry(hof.add, 3)).to.be.a('function');
    });
    it('curries a binary function with the passed argument', function () {
      expect(hof.curry(hof.add, 3)(2)).to.equal(5);
      expect(hof.curry(hof.sub, 6)(8)).to.equal(2);
    });
    describe('ADVANCED', function () {
      it('works for any number of arguments', function () {
        function multiply5 (a, b, c, d, e) { return a * b * c * d * e; }
        expect(hof.curry(multiply5, 1, 2)(3, 4, 5)).to.equal(120);
        expect(hof.curry(multiply5, 1, 2, 3)(4, 5)).to.equal(120);
      });
    });
  });
  describe('inc', function () {
    it('is a function', function () {
      expect(hof.inc).to.be.a('function');
    });
    it('increments the passed argument by 1', function () {
      expect(hof.inc(0)).to.equal(1);
      expect(hof.inc(-3)).to.equal(-2);
    });
  });
  describe('twice', function () {
    it('is a function', function () {
      expect(hof.twice).to.be.a('function');
    });
    it('the returned function calls the passed function with the passed argument twice', function () {
      const double = hof.twice(hof.add);
      const square = hof.twice(hof.mul);
      expect(double(3)).to.equal(6);
      expect(square(3)).to.equal(9);
    });
  });
  describe.only('reverse', function () {
    it('is a function', function () {
      expect(hof.reverse).to.be.a('function');
    });
    it('returns a function', function () {
      expect(hof.reverse()).to.be.a('function');
    });
    it('the returned function calls the passed function with its arguments reversed', function () {
      const sub_rev = hof.reverse(hof.sub);
      expect(sub_rev(4, 2)).to.equal(-2);
    });
    describe('ADVANCED', function () {
      it('works for any number of arguments', function () {
        function sub3 (a, b, c) { return a - b - c; }
        expect(hof.reverse(sub3)(1, 2, 3)).to.equal(sub3(3, 2, 1));
      });
    });
  });
  describe('composeu', function () {
    const double = hof.twice(hof.add);
    const square = hof.twice(hof.mul);
  
    it('is a function', function () {
      expect(hof.composeu).to.be.a('function');
    });
    it('returns a function', function () {
      expect(hof.composeu()).to.be.a('function');
    });
    it('the returned function composes the passed unary functions, passing the result of the first function as the argument to the second function', function () {
      const doubleThenSquare = hof.composeu(double, square);
      const squareThenDouble = hof.composeu(square, double);
      expect(doubleThenSquare(3)).to.equal(square(double(3)));
      expect(squareThenDouble(4)).to.equal(double(square(4)));
    });
    describe('ADVANCED', function () {
      it('works for any number of arguments', function () {
        const doubleSquareDouble = hof.composeu(double, square, double);
        const doubleFourTimes = hof.composeu(double, double, double, double);
        expect(doubleSquareDouble(2)).to.equal(double(square(double(2))));
        expect(doubleFourTimes(3)).to.equal(double(double(double(double(3)))));
      });
    });
  });
  describe('composeb', function () {
    it('is a function', function () {
      expect(hof.composeb).to.be.a('function');
    });
    it('the returned function composes the two passed binary functions, passing the result of the first function as the first argument to the second function', function () {
      const result = hof.composeb(hof.add, hof.mul)(2, 3, 5);
      expect(result).to.equal(25);
    });
  });
  describe('limit', function () {
    it('is a function', function () {
      expect(hof.limit).to.be.a('function');
    });
    it('returns a function', function () {
      expect(hof.limit()).to.be.a('function');
    });
    it('the returned function does the same as the passed argument', function () {
      const add_ltd = hof.limit(hof.add, 1);
      expect(add_ltd(2, 3)).to.equal(5);
    });
    it('the returned function can only be called a number of times equal to the 2nd passed argument', function () {
      const addSpy = sinon.spy(hof.add);
      const limitedAdd = hof.limit(addSpy, 2);
      expect(limitedAdd(1, 2)).to.equal(3);
      expect(limitedAdd(2, 3)).to.equal(5);
      expect(limitedAdd(3, 4)).to.be.undefined;
      expect(addSpy.calledTwice).to.be.true;
    });
  });
  describe('from', function () {
    it('is a function', function () {
      expect(hof.from).to.be.a('function');
    });
    it('emits consecutive integers starting from the passed argument', function () {
      const generator = hof.from(-2);
      expect(generator()).to.equal(-2);
      expect(generator()).to.equal(-1);
      expect(generator()).to.equal(0);
      expect(generator()).to.equal(1);
    });
  });
  describe('to', function () {
    it('is a function', function () {
      expect(hof.to).to.be.a('function');
    });
    it('emits consecutive integers from the passed generator up to the value of the second passed argument (not inclusive)', function () {
      const fromOne = hof.from(1);
      const upToThree = hof.to(fromOne, 3);
      expect(upToThree()).to.equal(1);
      expect(upToThree()).to.equal(2);
      expect(upToThree()).to.equal(undefined);
    });
  });
  describe('fromTo', function () {
    it('is a function', function () {
      expect(hof.fromTo).to.be.a('function');
    });
    it('returns a generator that emits consecutive integers between the first argument (inclusive) to the second argument (exclusive)', function () {
      const fromTwoToFive = hof.fromTo(2, 5);
      expect(fromTwoToFive()).to.equal(2);
      expect(fromTwoToFive()).to.equal(3);
      expect(fromTwoToFive()).to.equal(4);
      expect(fromTwoToFive()).to.equal(undefined);
    });
  });
  describe('element', function () {
    it('is a function', function () {
      expect(hof.element).to.be.a('function');
    });
    it('returns a function', function () {
      expect(hof.element()).to.be.a('function');
    });
    it('emits the values of the passed array corresponding to the indeces generated by the passed generator', function () {
      const list = ['a', 'b', 'c', 'd'];
      const genFromOneToThree = hof.fromTo(1, 3);
      const genLetters = hof.element(list, genFromOneToThree);
      expect(genLetters()).to.equal('b');
      expect(genLetters()).to.equal('c');
      expect(genLetters()).to.equal(undefined);
    });
    it('returns undefined until a valid index is generated', function () {
      const list = ['a', 'b', 'c', 'd'];
      const genFromMinusTwoToTwo = hof.fromTo(-2, 2);
      const genLetters = hof.element(list, genFromMinusTwoToTwo);
      expect(genLetters()).to.equal(undefined);
      expect(genLetters()).to.equal(undefined);
      expect(genLetters()).to.equal('a');
      expect(genLetters()).to.equal('b');
      expect(genLetters()).to.equal(undefined);
      expect(genLetters()).to.equal(undefined);
    });
    it('if no generator is passed, the returned generator will return all the elements of the array in order', function () {
      const list = ['a', 'b', 'c'];
      const genLetters = hof.element(list);
      expect(genLetters()).to.equal('a');
      expect(genLetters()).to.equal('b');
      expect(genLetters()).to.equal('c');
      expect(genLetters()).to.equal(undefined);
    });
  });
  describe('collect', function () {
    it('is a function', function () {
      expect(hof.collect).to.be.a('function');
    });
    it('returns a function', function () {
      expect(hof.collect()).to.be.a('function');
    });
    it('returns a generator that emits the values of the passed generator', function () {
      const gen = hof.collect(hof.fromTo(0, 3), []);
      expect(gen()).to.equal(0);
      expect(gen()).to.equal(1);
      expect(gen()).to.equal(2);
      expect(gen()).to.be.undefined;
    });
    it('collects the generated values in the passed array by mutating it', function () {
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
  describe('filter', function () {
    it('is a function', function () {
      expect(hof.filter).to.be.a('function');
    });
    it('returns a function', function () {
      expect(hof.filter()).to.be.a('function');
    });
    it('emits the same values as the generator if passed a predicate that is always true', function () {
      function alwaysTrue () { return true; }
      const fil = hof.filter(hof.fromTo(0, 3), alwaysTrue);
      expect(fil()).to.equal(0);
      expect(fil()).to.equal(1);
      expect(fil()).to.equal(2);
      expect(fil()).to.be.undefined;
    });
    it('emits no values if passed a predicate that is always false', function () {
      function alwaysFalse () { return false; }
      const fil = hof.filter(hof.fromTo(0, 3), alwaysFalse);
      expect(fil()).to.be.undefined;
      expect(fil()).to.be.undefined;
      expect(fil()).to.be.undefined;
    });
    it('emits only the values that pass the predicate', function () {
      const onlyEven = function (n) {return n % 2 === 0;};
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
  describe('concat', function () {
    it('is a function', function () {
      expect(hof.concat).to.be.a('function');
    });
    it('returns a function', function () {
      expect(hof.concat()).to.be.a('function');
    });
    it('emits all the values from the passed generator if only one is passed', function () {
      const gen = hof.concat(hof.fromTo(0, 3));
      expect(gen()).to.equal(0);
      expect(gen()).to.equal(1);
      expect(gen()).to.equal(2);
      expect(gen()).to.be.undefined;
    });
    it('emits all the values from the 2nd passed generator after all the values from the 1st one have been emitted', function () {
      const gen = hof.concat(hof.fromTo(0, 2), hof.fromTo(2, 5));
      expect(gen()).to.equal(0);
      expect(gen()).to.equal(1);
      expect(gen()).to.equal(2);
      expect(gen()).to.equal(3);
      expect(gen()).to.equal(4);
      expect(gen()).to.be.undefined;
    });
    describe('ADVANCED', function () {
      it('returns undefined if no generators were passed', function () {
        const gen = hof.concat();
        expect(gen()).to.be.undefined;
      });
      it('works for more than two arguments', function () {
        const gen = hof.concat(hof.fromTo(0, 2), hof.fromTo(2, 4), hof.fromTo(4, 6));
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
  describe('gensymf', function () {
    it('is a function', function () {
      expect(hof.gensymf).to.be.a('function');
    });
    it('returns a function', function () {
      expect(hof.gensymf()).to.be.a('function');
    });
    it('returns a generator that emits unique strings starting with the passed argument', function () {
      const genNC = hof.gensymf('NC');
      expect(genNC()).to.equal('NC1');
      expect(genNC()).to.equal('NC2');
      expect(genNC()).to.equal('NC3');
      expect(genNC()).to.equal('NC4');
      expect(genNC()).to.equal('NC5');
    });
  });
  describe('gensymff', function () {
    it('is a function', function () {
      expect(hof.gensymff).to.be.a('function');
    });
    it('returns a function', function () {
      expect(hof.gensymff()).to.be.a('function');
    });
    it('returns a gensymf-type function that emits unique strings starting with the passed argument, with values generated by the unary function, starting from the seed', function () {
      const gensymf = hof.gensymff(hof.inc, 1);
      const genNC = gensymf('NC');
      expect(genNC()).to.equal('NC2');
      expect(genNC()).to.equal('NC3');
      expect(genNC()).to.equal('NC4');
      expect(genNC()).to.equal('NC5');
    });
  });
  describe('fibonaccif', function () {
    it('is a function', function () {
      expect(hof.fibonaccif).to.be.a('function');
    });
    it('returns a function', function () {
      expect(hof.fibonaccif()).to.be.a('function');
    });
    it('returns a generator that emits fibonacci numbers starting from the passed arguments', function () {
      const fib = hof.fibonaccif(2, 3);
      expect(fib()).to.equal(2);
      expect(fib()).to.equal(3);
      expect(fib()).to.equal(5);
      expect(fib()).to.equal(8);
      expect(fib()).to.equal(13);
    });
  });
  describe('counter', function () {
    it('is a function', function () {
      expect(hof.counter).to.be.a('function');
    });
    it('returns an object', function () {
      expect(hof.counter()).to.be.an('object');
    });
    it('returns a generator with an up() method that emits and increments the internal hof.counter value', function () {
      const c = hof.counter(10);
      expect(c.up()).to.equal(11);
      expect(c.up()).to.equal(12);
      expect(c.up()).to.equal(13);
    });
    it('returns a generator with a down() method that emits and decrements the internal counter value', function () {
      const c = hof.counter(20);
      expect(c.down()).to.equal(19);
      expect(c.down()).to.equal(18);
      expect(c.down()).to.equal(17);
    });
    it('alternating the up and down methods updates the internal hof.counter value correctly', function () {
      const c = hof.counter(5);
      expect(c.down()).to.equal(4);
      expect(c.up()).to.equal(5);
      expect(c.up()).to.equal(6);
      expect(c.down()).to.equal(5);
    });
    it('hides the state of the counter, i.e. the returned object only has the "up" and "down" methods', function () {
      expect(hof.counter(20)).to.have.all.keys(['up', 'down']);
    });
  });
  describe('revokable', function () {
    it('is a function', function () {
      expect(hof.revokable).to.be.a('function');
    });
    it('returns an object', function () {
      expect(hof.revokable()).to.be.an('object');
    });
    it('returns an object with an "invoke" method that can invoke the passed binary function', function () {
      const mul_rev = hof.revokable(hof.mul);
      expect(mul_rev.invoke(2, 3)).to.equal(6);
    });
    it('returns an object with a "revoke" method that disables the "invoke" method from returning values', function () {
      const mul_rev = hof.revokable(hof.mul);
      expect(mul_rev.invoke(2, 3)).to.equal(6);
      mul_rev.revoke();
      expect(mul_rev.invoke(3, 4)).to.be.undefined;
    });
  });
});