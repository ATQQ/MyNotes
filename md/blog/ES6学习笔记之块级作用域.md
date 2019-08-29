# ES6学习笔记:块级作用域
## 作用域分类
* 全局作用域
* 局部作用域
* 块级作用域
### 全局作用域示例
```js
var i=2;
for (var i = 0; i < 10; i++) {
}
console.log(i);//10
```
* 这里就出现了意料之外的结果,此种原因是变量提升造成过的
  
### 局部作用域示例
```js
!(function () {
    console.log(b);//undefined
    var b = 2;
})()
```
* 为什么会输出undefined,而不是报错?
* 此种也是变量提升造成的意料之外的结果,上面代码等同于下面.
```js
!(function () {
var b;
console.log(b);//undefined
b=2;
})()
```
### 这里就抛出来了一个问题,**什么是变量提升**?
>JavaScript 中，函数及变量的声明都将被提升到函数的最顶部。

>JavaScript 中，变量可以在使用后声明，也就是变量可以先使用再声明。
### ES6中引入了块级作用域的概念
```js
//块级作用域使用方式
{
  //...code  
}
```
注意:使用 **var 声明变量**不受块级作用域限制,依旧会造成的变量提升,因此

引入了两个新的变量
* let
  * 用法:声明一个变量
  * 特点:
    * 只在声明的代码块有效
    * 在同一作用域中不能重复声明
    * 没有变量提升
    * 暂时性死区
* const
  * 用法:声明一个只读变量(可理解为常量)
  * 特点:跟let一致
  * 注意事项:
    * 变量声明的同时必须立即赋值
    * 如声明的是简单类型数据,变量的值不可改变
  * 实质:保证变量指向的内存地址所保存的数据不允许变动

    简单类型如字符串,数字,布尔值,复杂类型如对象,数组,函数,所以const声明复杂类型对象时需慎重

### 使用示例
* 示例1
```js
if(true){
    var a=10;
}
console.log(a);//10
```
* 示例2
```js
if(true){
    let a=10;
}
console.log(a);//error: a is not defined
```
* 示例3
```js
{
    let a=2;
}

{
    let a=3;
    console.log(a);//3
}
```
* 示例4
```js
{
    const a=2;
    console.log(a);//2
    a = 3;//error:"a" is read-only
}
```
* 示例5
```js
{
    const obj={
        name:'小明',
        age:18
    }
    console.log(obj);//{name:"小明",age:18}
    obj.name="小红";
    console.log(obj);//{name:"小红",age:18}
}
```