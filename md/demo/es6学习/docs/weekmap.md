```js
//map
{
    let $map1=new Map();
    $map1.set([1,2,3],777);
    console.log('$map1 :', $map1);

    //定义时初始化
    let $map2=new Map([['name','小明'],[[1,2,3],666]]);
    console.log('$map2 :', $map2);

    //set支持链式调用
    $map1.set('name','小明').set('age','小黑');
    console.log('$map1 :', $map1);

    //get取值
    console.log('$map1.get("name") :', $map1.get("name"));
    console.log('$map1.get("ddd") :', $map1.get("ddd"));

    //has判断是否存在
    console.log('$map1.has("name") :', $map1.has("name"));

    //delete删除
    $map1.delete('name');
    console.log('$map1 :', $map1);
}

//keys values entries forEach
{
    let $map=new Map([
        ['name','小黑'],
        ['age',18]
    ])
    console.log('$map.keys() :', $map.keys());
    console.log('$map.values() :', $map.values());
    console.log('$map.entries() :', $map.entries());
    $map.forEach((v,key)=>{
        console.log('v :', v);
    })

    //for of 循环默认遍历entries()
    for (const key of $map) {
        console.log('key :', key);
    }
}

/**
 * WeekMap
 * 1. 只接受对象作为键名
 * 2. 垃圾回收机制(如果绑定的对象被销毁了,将自动回收)
 */
{
    var $weekMap=new WeakMap();
    $weekMap.set([1,2],3);
    console.log('$weekMap :', $weekMap);
}
```