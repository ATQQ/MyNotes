// var a = 1
// var b = 2
// function sum(c,d){
//     console.log('a',this.a);
//     console.log('b',this.b);
//     console.log('c',c);
//     console.log('d',d);
//     return this.a + this.b + c + d
// }

// const d1 = {
//     a:10,
//     b:11
// }
// const d2 = {
//     a:20,
//     b:21
// }
// console.log('--normal--');
// console.log(sum(1,1));

// console.log('--call--');
// console.log(sum.call(d1,3,4));

// console.log('--apply--');
// console.log(sum.apply(d2,[5,6]));

const obj = {
    a:1,
    b:2,
    sum(c,d){
        return this.a+this.b+c+d
    }
}
const obj2 = {
    a:100,
    b:200
}
console.log(obj.sum(5,6));
console.log(obj.sum.call(obj2,5,6));
console.log(obj.sum.apply(obj2,[5,6]));