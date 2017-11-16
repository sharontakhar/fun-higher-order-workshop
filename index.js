const hof = {};

hof.identity = function (x) {
  return x;
};

hof.identityf = function (x) {
  return function() {
    return x;
  };
};

hof.add = function (a,b) {
  return a + b;
};

hof.sub = function (a,b) {
  return a - b;
};

hof.mul = function (a,b) {
  return a*b;
};

hof.addf = function (a) {
  return function(b) {
    return a + b;
  };
};

hof.liftf = function (bin) {
  return function (a) {
    return function(b) {
      return bin(a,b);
    };
  };
};

hof.curry = function (bin,a) {
  return function(b) {
    return bin(b,a);
  };
};

// hof.inc = function (val) {
//   return val+1;
// };

hof.inc = function (val) {
  return hof.add(val,1);
};

hof.twice = function (bin) {
  return function (a) {
    return bin(a,a);
  };
};

hof.reverse = function (func) {
  
  return function () {
    const args = [...arguments];
    const newArgs = args.reverse();
    return func(...newArgs);
  };
};

hof.composeu = function () {

  const args = [...arguments];
  return function(val) {
    return args.reduce((acc,func,i) => {
      i === 0 ? acc = func(val) : acc = func(acc);
      return acc;
    },0);
  };
};

hof.composeb = function () {};

hof.limit = function () {};

hof.from = function () {};

hof.to = function () {};

hof.fromTo = function () {};

hof.element = function () {};

hof.collect = function () {};

hof.filter = function () {};

hof.concat = function () {};

hof.gensymf = function () {};

hof.gensymff = function () {};

hof.fibonaccif = function () {};

hof.counter = function () {};

hof.revokable = function () {};

module.exports = hof;