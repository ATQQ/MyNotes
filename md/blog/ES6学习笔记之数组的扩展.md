# :pencil2:1. 扩展运算符
扩展运算符（spread）是三个点（<code>...</code>）,将一个数组转为用逗号分隔的参数序列。
* 普通用法
```js
console.log(...[1,2,3]);//1 2 3

```
* 数组拷贝(普通类型深拷贝,复杂类型浅拷贝)
```js
const arr1 = [1, 2, 3, 4, 5];
const arr2 = [...arr1];
arr2[0] = 666;
console.log('arr2:', arr2);//[666,2,3,4,5]
console.log('arr1:', arr1);//[1,2,3,4,5]
```
* 分割数组(解构赋值)
```js
const arr1=[1,'2','3','4'];
const [,...arr2]=arr1;
console.log('arr2 :', arr2);//arr2 : ["2", "3", "4"]
```
* 合并数组
```js
let arr1=[1,2,3],
arr2=[4,5,6];
let arr3=[...arr1,...arr2];//[1,2,3,4,5,6]
```
* 传递参数
```js
function add(x,y) {
    return x+y;
}
const arr=[1,2];
console.log(add(...arr));//3
```
* 替代函数的 apply 方法 
```js
// ES5 的写法
function f(x, y, z) {
  // ...
}
var args = [0, 1, 2];
f.apply(null, args);

// ES6的写法
function f(x, y, z) {
  // ...
}
let args = [0, 1, 2];
f(...args);
```
```js
// ES5 的写法
Math.max.apply(null, [14, 3, 77])//77

// ES6 的写法
Math.max(...[14, 3, 77])//77

// 等价于
Math.max(14, 3, 77);//77
```
* 字符串转数组
```js
[..."abcdefg"];//[a,b,c,d,e,f,g]
```
---
# :pencil2:2. 扩展的实例方法
## 1.Array.from 
>将类数组转换为数组 (①带有length属性的,②可遍历)
### 转换自定义对象
```js
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
```
### 字符串转数组
```js
Array.from('hello')
```
### Set转数组
```js
    let set=new Set(['name','age']);
    console.log(Array.from(set));//["name", "age"]
```
>Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。
```js
Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);

Array.from([1, 2, 3], (x) => x * x)
```
## 2.Array.fill()
fill方法使用给定值，填充一个数组。
```js
{
    // 1参数
    const arr1 = [1, 2, 3, 4, 5];
    let arr2 = [...arr1].fill(3);

    // 三参数:用6从下标0开始填充直到下标3之前
    console.log(arr2);//333333
    console.log([...arr1].fill(6, 0, 3))//66645

    const arr3 = [];
    console.log(arr3.fill(0, 0, 10));//[]

    // 初始化数组
    let arr=new Array(5).fill(0);
    console.log(arr);//[0,0,0,0,0]
}
```
## 3.Array.find(),Array.findIndex
>数组实例的find方法，用于找出第一个**符合条件**的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。

>数组实例的findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。
* 查找数组中第一个大于5的成员
```js
let arr=[1,3,4,2,8,4,8];
let res=arr.find(v=>{
    return v>5;
})
let resIndex=arr.findIndex(v=>{
    return v>5;
})
console.log(res,resIndex);//8 4
```
* find,findIndex方法的回调有三个参数,依次为当前值,当前的位置,原数组
```js
let res=[1,2,3,4,5].find((v,i,arr)=>{
    return arr[i]===v;
})
console.log(res);//1
```
## 4.Array.includes() 和 Array.indexOf() 
> Array.prototype.includes方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似。ES2016 引入了该方法。
```js
[1, 2, 3].includes(2)     // true
[1, 2, 3].includes(4)     // false
```
>该方法的第二个参数表示搜索的起始位置，默认为0。如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度（比如第二个参数为-4，但数组长度为3），则会重置为从0开始。
```js
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true
```
>在此之前用indexOf判断是否包含目标值,indexOf方法有两个缺点，1.不够语义化，它的含义是找到参数值的第一个出现位置，所以要去比较是否不等于-1，表达起来不够直观。2.它内部使用严格相等运算符（===）进行判断，这会导致对NaN的误判。
```js
[NaN].indexOf(NaN)//-1
[NaN].includes(NaN)//true
```
## 5.Array.flat()
>数组的成员有时还是数组，Array.prototype.flat()用于将嵌套的数组展开，变成一维的数组。该方法返回一个新数组，对原数据没有影响。
```js
[1,2,[3,4],5,[6]].flat();
// [1, 2, 3, 4, 5, 6]
```
>flat()默认只会展开一层，如果想要展开多层的嵌套数组，可以将flat()方法的参数写成一个整数，表示想要展开的层数，默认为1。
```js
[1, 2, [3, [4, 5]]].flat()
// [1, 2, 3, [4, 5]]

[1, 2, [3, [4, 5]]].flat(2)
// [1, 2, 3, 4, 5]
```
>如果不管有多少层嵌套，都要转成一维数组，可以用Infinity关键字作为参数。
```js
[1, [2, [3]]].flat(Infinity)
// [1, 2, 3]
```
>如果有空,则会自动跳过空处
```js
[1,2,,3,4,[5]].flat();
//[1,2,3,4,5]
```