# 新的数据类型Symbol
* 引入背景
  * 对象的属性名容易产生命名冲突,为保证键名一致性,故引入了Symbol
* demo
```js
let a=Symbol('test')
let b=Symbol('test')
console.log(a)
console.log(a===b)//false


let a=Symbol.for('fw')//寻找'fw'是否存在不存在则新创建,存在即赋予
let b=Symbol.for('fw')
console.log(a===b);//true


let a=Symbol('fw')
let obj={
    fw:123,
    [a]:456,
    a:789
}
console.log(obj);

//以下两种方式等价
//method1
let a=Symbol('fw')
let obj={};
obj[a]=123;
console.log(obj);
//method2
let a=Symbol('fw')
let obj={}
Object.defineProperty(obj,a,{
    value:123
})
console.log(obj);


const user=Symbol("sugar")
console.log(user);//Symbol(sugar)


```