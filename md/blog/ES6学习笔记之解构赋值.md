# 1.数组的解构赋值
## 简单用法
```js
{
    // 旧
    let a=1,b=3;

    //新
    let [a,b]=[1,3];

    console.log(a,b);// 1 3
}
```
## 只要等号两边的模式相同，左边的变量就会被赋予对应的值。
```js
{
     let a,b,c;
     [a,b,c]=[1,2]
     console.log(a,b,c);// 1 2 undifined
}

{
    let [a,b,c]=[1,,3];
    a,b,c;//1 undefined 3
}

{
    let [a,b]=[1,[2,3]];
    a;//1
    b;//[2,3]
}

{
    let [a,...b]=[1,2,3];
    a;//1
    b;//[2,3]
}

{
    let [a, b, ...c] = [1];
    a;//1
    b;//undefined
    c;//[]
}

{
    let [a,[b],c]=[1,[2,3],4]
    a;//1
    b;//2
    c;//4
}
```
## 设置默认值
```js
let [a='hello']=[];
a;//hello

let [b='world']=['yes'];
b;//yes

// ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于undefined，默认值才会生效。
let [c=13]=[undefined];
c;//13

let [d=12]=[null];
d;//null
```
## 实例
* 交换两个变量的值
```js
    let [a, b]=[2,3];
    [a,b]=[b,a];
    console.log(a);//3
```
#  对象的解构
## 常规用法
```js
    let a,b;
    ({ a, b } = { a: 2, b: 3 })
    console.log(a,b);//2,3;

    //变量名与属性名一致
    let {name}={name:'小明',age:18};
    console.log(name);//小明

    // 变量名与属性名不一致
    let {a:name,b:age}={a:'小明',b:18};
    console.log(name,age);//小明 18
```
## 如果解构失败，变量的值等于undefined。
```js
let {a}={b:2};
a;//undefined
```

## 多层嵌套
```js
function fn() {
    return {
        name: '小明',
        userList: [
            { name: '小红' }
        ]
    }
}

let res = fn();
let { name: person, userList: [{ name: otherPerson }] } = res;

console.log(person, otherPerson);//小明 小红
```
## 如果解构模式是嵌套的对象，而且子对象所在的父属性不存在，那么将会报错。
```js
let {a: {b}} = {b: 666};
```

## 设置默认值
```js
let {a=1}={a:3};
```

