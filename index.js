const hof = {};

hof.identity = function (argsToReturn) {
    return argsToReturn;
};

hof.identityF = function (argsToReturn) {
    function identity(){
        return argsToReturn;
    }
return identity

//arg is banana
//function totallyNew(){
//return banana
// }
//return banana
};

hof.add = function (a , b) {
    return a + b;
};

hof.subtract = function (a , b) {
    return a - b;
};

hof.multiply = function (a, b) {
    return a * b;
};

hof.increment = function (a) {
    a += 1;
    console.log(a)
    return a;
    
};

hof.addF = function (banana) {
    function newFuncToAdd(apple){
        return banana + apple};
    
return newFuncToAdd
};

hof.curry = function (binaryFunc, val1) {
    function innerCurry(val2){
        console.log(binaryFunc, val1, val2 , "<<<this")

        return binaryFunc(val1, val2)
    }
    return innerCurry
};

hof.liftF = function (banana) {
  function inception(peaches){
    function spinningTop (value1) {
    return  banana(peaches,value1)
    }       
   return spinningTop
}
return inception
}


hof.twice = function (binaryFunc) {
 
function mainFunc (args){  
    return binaryFunc (args, args)
    }
return mainFunc;
}

//return binaryFunc(value1,value2)



hof.composeU = function () {};

hof.composeB = function () {};

hof.limit = function () {};

hof.from = function () {};

hof.to = function () {};

hof.fromTo = function () {};

hof.element = function () {};

hof.collect = function () {};

hof.filter = function () {};

hof.concat = function () {};

hof.fibonacciF = function () {};

hof.genSymF = function () {};

hof.genSymFF = function () {};

hof.counter = function () {};

hof.revokable = function () {};

module.exports = hof;
