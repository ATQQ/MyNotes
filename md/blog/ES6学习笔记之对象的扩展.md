# :pencil2:1.对象中的扩展运算符
>[ES2018](https://www.html.cn/archives/9990) 将扩展运算符(<code>...</code>)引入了对象。
* 拷贝对象
```js
const obj1={
    name:"小明",
    age:18
}    
const obj2={...obj1};
obj2.name='小红';
console.log('obj1 :', obj1);//{name: "小明", age: 19}
console.log('obj2 :', obj2);//{name: "小红", age: 19}
```
* 设置对象默认值
```js
let defaultObj = {
    class: 8,
    school: 'swpu'
}

let s1 = { ...defaultObj, name: '小红', age: 18 };
let s2 = { ...defaultObj, name: '小红', age: 19 };
console.log(s1);//{class: 8, school: "swpu", name: "小红", age: 18}
console.log(s2);//{class: 8, school: "swpu", name: "小红", age: 19}
```
* 合并对象(注意:展开简单运算法时是深拷贝,复杂类型是浅拷贝)
```js
const testObj1 = { kind: 'pig' };
const testObj2 = { color: "red" };
let obj3 = { ...testObj1, ...testObj2 };
console.log(obj3);//{kind: "pig", color: "red"}
```
# :pencil2:2.新的对象声明的书写方式
>ES6 允许直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。
```js
    //old
    let name="小明";
    let age=19;
    let obj1={
        name:name,
        age:age,
        sayHello:function () {
            console.log('hello es5');
        }
    }

    //等价于↓

    //new
    let obj2={
        name,
        age,
        sayHello(){
            console.log("hello es6");
        }
    }
```
>这种写法用于函数的返回值，将会非常方便。
```js
function getRectangle(){
    let w=5;
    let l=10;
    return {w,l};
}
getRectangle();
```
# :pencil2:3.属性名表达式(对象中的计算属性)
>js中定义属性的方法
```js
let obj={};
// 第一种
obj.a='hello';

// 第二种
obj['b'+'b']='hello';
```
>但是，如果使用字面量方式定义对象（使用大括号），在 ES5 中只能使用第一种（标识符）定义属性。
```js
// 第三种
let obj={
    a:1,
    'b':2
}
```
>ES6 允许字面量定义对象时，用第二种（表达式）作为对象的属性名，即把表达式放在方括号内。
```js
    let key = 'name';
    let obj = {
        [key]: '小黑'
    }
```
# :pencil2:4.新增方法
## Object.is()
>ES5中 比较两个值是否相等，只有两个运算符：相等运算符（==）和严格相等运算符（===）。它们都有缺点，前者会自动转换数据类型，后者的NaN不等于自身，以及+0等于-0。
<code>Object.is()</code> 跟===作用相同 区别在于NaN,前者相等,后者不等
```js
    console.log(Object.is(NaN,NaN));//true
    console.log(NaN===NaN);//false
```
---
## Object.assign(target,...source)
### 对象的合并
>用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）,第一个参数是目标对象，后面的参数都是源对象。
```js
const a = { a: 1 };

const b1 = { b1: 1 };
const b2 = { b2: 2 };
const b3 = { b3: 3 };
Object.assign(a, b1,b2,b3);
a //{a: 1, b1: 1, b2: 2, b3: 3}
```
>**注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。**
```js
let a1={name:'小明',age:14}
let a2={name:'小红',address:'中国大陆'}
let a3=Object.assign({},a1,a2);
a3;//{name: "小红", age: 14, address: "中国大陆"}
```
### 对象的拷贝
>简单类型深拷贝,复杂类型浅拷贝,只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性
```js
    let obj1 = {
        name: '小明',
        age: 12
    }
    let obj2 = {};
    Object.assign(obj2, obj1);
    obj1.name = '小黑';
    console.log('obj2 :', obj2);//{name: "小明", age: 12}
    console.log('obj1 :', obj1);//{name: "小黑", age: 12}
```
### 常见用途
* 为对象添加属性
  ```js
  class Point {
  constructor(x, y) {
    Object.assign(this, {x, y});
    }
  }
  ```
* 为对象添加方法
  ```js
  Object.assign(obj.prototype, {
        method1(a, b) {
        return a+b;
        },
        method2(a,b) {
        return a*b;
        }
  });
  
  // 等同于下面的写法
  obj.prototype.method1 = function(a, b){
    return a+b;
    }
  obj.prototype.method2 = function (a,b) {
    return a*b;
  };
  ```
---
## Object.keys() Object.values() Object.entries()
* Object.keys()返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历属性的键名。
* Object.values()返回一个数组,成员是参数对象自身的所有可遍历属性的键值
* Object.entries()返回一个数组,成员是参数对象自身的所有可遍历属性的键值对
```js
 let obj = {
        name: '小明',
        age: 98
    }

    let keys = Object.keys(obj);
    let values = Object.values(obj);
    let entries = Object.entries(obj);
    console.log('keys :', keys);//["name", "age"]
    console.log('values :', values);// ["小明", 98]
    console.log('entries :', entries);//[["name", "小明"],["age",98]]
```
---
## Object. fromEntries()
> 将键值对数组转为对象
```js
const obj=Object.fromEntries([
  ['name', '李华'],
  ['age', 18]
])
console.log(obj);//{name: "李华", age: 18}
```