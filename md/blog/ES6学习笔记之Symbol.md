# 新的数据类型Symbol
## 1. 概述
>ES5 的对象属性名都是字符串，这容易造成属性名的冲突。比如，你使用了一个他人提供的对象，但又想为这个对象添加新的方法（mixin 模式），新方法的名字就有可能与现有方法产生冲突。如果有一种机制，保证每个属性的名字都是独一无二的就好了，这样就从根本上防止属性名的冲突。这就是 ES6 引入Symbol的原因。

>ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值。它是 JavaScript 语言的第七种数据类型。

## 2.简单的用法
* 最简单的声明
```js
let a=Symbol();
console.log(a);//Symbol()
```
* 每一个都是独一无二
```js
let a=Symbol()
let b=Symbol()
console.log(a===b)//false
```
## 3.Symbol.for()，Symbol.keyFor() 
>有时，我们希望重新使用同一个 Symbol 值，Symbol.for方法可以做到这一点。它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建并返回一个以该字符串为名称的 Symbol 值。
```js
let a=Symbol.for('fw')
let b=Symbol.for('fw')
console.log(a===b);//true

Symbol("bar") === Symbol("bar")//false
```
>由于Symbol()写法没有登记机制，所以每次调用都会返回一个不同的值。<code>
Symbol.keyFor</code>方法返回一个已登记的 Symbol 类型值的key。
```js
let s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

let s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined
```
## 4.作为属性名的 Symbol
>由于每一个 Symbol 值都是不相等的，这意味着 Symbol 值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性。这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。
```js
let testKey=Symbol();

// 第一种写法
let a={};
a[testKey]='hello world';

// 第二种
let a={
    [testKey]:'hello world'
}

// 第三种
let a={};
Object.defineProperty(a,testKey,{value:'hello world'})

// 以上写法得到同样的结果
console.log(a[testKey]);//hello world
```

**注意，Symbol 值作为对象属性名时，不能用点运算符。**
* demo1
```js
const mySymbol = Symbol();
const a = {};

a.mySymbol = 'Hello!';
a[mySymbol] // undefined
a['mySymbol'] // "Hello!"
```
* demo2
```js
let a=Symbol('symbolA');

let obj={
    [a]:1,
    a:2
}
// 各种写法的结果
obj.a   //2
obj['a']//2
obj[a]  //1
```

## 5.使用场景(实例)
* 旧写法
```js
function getArea(shape, options) {
    let area = 0;
    switch (shape) {
        case 'Triangele':
            area = options.w * options.h / 2;
            break;
        case 'Squire':
            area = options.w * options.h;
            break;
            /**more code */
    }
    return area;
}
getArea('Squire',{w:10,h:2});//20
```
* 新写法
```js
const shapeType = {
    Triangle: Symbol(),
    Squire: Symbol()
}
function getArea(shape, options) {
    let area = 0;
    switch (shape) {
        case shapeType.Triangle:
            area = options.w * options.h / 2;
            break;
        case shapeType.Squire:
            area = options.w * options.h;
            break;
        /**more code */
    }
    return area;
}
getArea(shapeType.Squire, { w: 10, h: 2 });
``` 

### 参考
>[ECMAScript 6 入门](https://es6.ruanyifeng.com/#README)