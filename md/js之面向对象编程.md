# new命令
## 基本用法
```js
var obj=function(){
    this.price=1000;
}
var v=new obj();
v.price;//1000

////
var v=obj();
v//undefined
price//1000
```
忘了加上new命令。结果，变量v变成了undefined，而price属性变成了全局变量。因此，应该非常小心，避免不使用new命令、直接调用构造函数。

为了保证构造函数必须与new命令一起使用，一个解决办法是，构造函数内部使用严格模式，即第一行加上use strict。这样的话，一旦忘了使用new命令，直接调用构造函数就会报错。
```js
var obj=function(){
    'use strict'
    this.price=1000;
}
```
另一个解决办法，构造函数内部判断是否使用new命令，如果发现没有使用，则直接返回一个实例对象。
```js
var obj=function(){
    if(!(this instanceof obj)){
        return new obj();
    }
    this.price=1000;
}
obj();
```

## new 的原理
如果构造函数内部有return语句，而且return后面跟着一个对象，new命令会返回return语句指定的对象；否则，就会不管return语句，返回this对象。

但是，如果return语句返回的是一个跟this无关的新对象，new命令会返回这个新对象，而不是this对象。这一点需要特别引起注意。

另一方面，如果对普通函数（内部没有this关键字的函数）使用new命令，则会返回一个空对象。
```js
var Vehicle = function () {
  this.price = 1000;
  return 1000;
};

(new Vehicle()) === 1000
// false

var Vehicle = function (){
  this.price = 1000;
  return { price: 2000 };
};

(new Vehicle()).price
// 2000

function getMessage() {
  return 'this is a message';
}

var msg = new getMessage();

msg // {}
typeof msg // "object"
```

## new.target
函数内部可以使用new.target属性。如果当前函数是new命令调用，new.target指向当前函数，否则为undefined。
```js
function f() {
  console.log(new.target === f);
}

f() // false
new f() // true

function f() {
  if (!new.target) {
    throw new Error('请使用 new 命令调用！');
  }
  // ...
}

f() // Uncaught Error: 请使用 new 命令调用！
```
# this
## 网页编程的例子
```html
<input type="text" name="age" size=3 onChange="validate(this, 18, 99);">

<script>
function validate(obj, lowval, hival){
  if ((obj.value < lowval) || (obj.value > hival))
    console.log('Invalid Value!');
}
</script>
```
## 使用场合
1. 全局环境

全局环境使用this，它指的就是顶层对象window。
```js
this===window//true
```
2. 
