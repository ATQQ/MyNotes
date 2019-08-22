```js
//对象中的扩展运算符

{
    //复制对象
    const obj1 = {
        name: '小明',
        age: 19
    }
    let obj2 = {...obj1 };
    obj2.name='小红';
    console.log('obj1 :', obj1);
    console.log('obj2 :', obj2);

    //设置对象默认值
    let obj3={...obj1,name:'小黑'};
    console.log('obj3 :', obj3);

    // 合并对象
    const testObj={color:"red"};
    let obj4={...obj3,...testObj}
    console.log('obj4 :', obj4);

    // 坑点,展开简单运简单时 是深拷贝,复杂类型是浅拷贝
}

//对象声明的书写
{
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

    //new
    let obj2={
        name,
        age,
        sayHello(){
            console.log("hello es6");
            
        }
    }

    obj1.sayHello();
    obj2.sayHello();
}

// 对象中的计算属性
{
    //old
    let key='name';
    let obj1={};
    obj1[key]='小明'
    //new
    let obj2={
        [key]:'小黑'
    }
    console.log('obj1 :', obj1);
    console.log('obj2 :', obj2);
}

//新增方法
{
    // Object.is() 跟===作用相同 区别在于NaN,前者相等,后者不等
    console.log(Object.is(NaN,NaN));
    console.log(NaN===NaN);
    
    //Object.assign() 简单类型深拷贝,复杂类型浅拷贝
    let obj1={
        name:'小明',
        age:12
    }
    let obj2={};
    Object.assign(obj2,obj1);
    obj1.name='小黑';
    console.log('obj2 :', obj2);
    console.log('obj1 :', obj1);
}

//Object.keys Object.values Object.entries
{
    let obj={
        name:'小明',
        age:98
    }

    let keys=Object.keys(obj);
    let values=Object.values(obj);
    let entries=Object.entries(obj);
    console.log('keys :', keys);
    console.log('values :', values);
    console.log('entries :', entries);
}

```