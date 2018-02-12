const expect = require('chai').expect;
const sinon = require('sinon');

const hof = require('../index');

describe('Higher Order Functions', function() {
  describe('Identity Functions', () => {
    describe('identity', () => {
      it('returns the first value passed as an argument', () => {
        expect(hof.identity(3)).to.equal(3);
        expect(hof.identity('winter')).to.equal('winter');
        expect(hof.identity(true)).to.be.true;
        expect(hof.identity(null)).to.be.null;
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
      it('will add the first argument to the second', () => {
        expect(hof.add(56, 5)).to.be.equal(56 + 5);
        expect(hof.add(91, -71)).to.be.equal(91 + -71);
      });
    });
    describe('sub', () => {
      it('will subtract the second argument from the first', () => {
        expect(hof.sub(57, 10)).to.equal(57 - 10);
      });
    });
    describe('mul', () => {
      it('will multiply two arguments together', () => {
        expect(hof.mul(5, 30)).to.be.equal(5 * 30);
      });
    });
  });
  describe('Functions with multiple invocations', () => {
    describe('addf', () => {
      it('returns a function on first invocation', () => {
        expect(hof.addf(3)).to.be.a('function');
      });
      it('will add arguments from both invocations together', () => {
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
        expect(hof.liftf(hof.mul)).to.be.a('function');
      });
      it('returns a function on second invocation', () => {
        expect(hof.liftf(hof.add)(1)).to.be.a('function');
        expect(hof.liftf(hof.mul)(5)).to.be.a('function');
      });
      it('returns the result on third invocation', () => {
        expect(hof.liftf(hof.add)(1)(6)).to.be.equal(hof.add(1, 6));
        expect(hof.liftf(hof.mul)(5)(6)).to.be.equal(hof.mul(5, 6));
      });
    });
    describe('Curry', () => {
      it('will take a binary function and a single argument and return a function', () => {
        expect(hof.curry(hof.add, 5)).to.be.a('function');
      });
      it('second invocation will return the result', () => {
        const timesByThirty = hof.curry(hof.mul, 30);
        expect(timesByThirty(6)).to.equal(hof.mul(6,30));
      });
    });
     
      
  });
});

