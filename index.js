const hof = {};

hof.identity = x => x;

hof.identityf = x => () => x;

hof.add = (a, b) => a + b;

hof.sub = (x, y) => x - y;

hof.mul = (x, y) => x * y;

hof.addf = x => y => x + y;

hof.liftf = func => x => y => func(x, y);

hof.curry = (operation, ...initialArgs) => (...remainingArgs) =>
  operation(...initialArgs, ...remainingArgs);

hof.inc = x => ++x;

hof.twice = func => x => func(x, x);

hof.reverse = func => (x, y) => func(y, x);

hof.composeu = (func1, func2) => x => func2(func1(x));

hof.composeb = (func1, func2) => (x, y, z) => func2(func1(x, y), z);

hof.limit = (func, limit) => {
  let callCount = 0;
  return (x, y) => (callCount++ < limit ? func(x, y) : undefined);
};

hof.from = x => () => x++;

hof.to = (gen, x) => hof.limit(gen, x);

hof.fromTo = (x, y) => hof.to(hof.from(x), y);

hof.element = (arr, gen = hof.from(0)) => () => arr[gen()];

hof.collect = (gen, arr) => [...arr, gen()];

hof.filter = (gen, predicate) => predicate(gen());

hof.concat = (gen1, gen2) => () => {
  const x = gen1();
  return x !== undefined ? x : gen2();
};

hof.gensymf = char => {
  let x = 0;
  return () => `${char}${x++}`;
};

hof.gensymff = (gen, seed) => char => {
  const value = gen(seed);

  return () => `${char}${gen(value)}`;
};

hof.fibonaccif = function() {};

hof.counter = x => ({ x, up: () => ++x, down: () => --x });

hof.revokable = func => ({
  invoke: func,
  revoke () {
    this.invoke = () => undefined;
  }
});

module.exports = hof;
