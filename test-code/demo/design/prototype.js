function A(){

}

const a = new A()

console.log(a.__proto__===A.prototype);
console.log(A===A.prototype.constructor);
console.log(a.__proto__.constructor===A.prototype.constructor);
console.log(a.__proto__.constructor===A);