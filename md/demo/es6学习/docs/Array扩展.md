# 数组的扩展
```js
{
    //扩展运算符 ...

    // 数组的浅拷贝
    const arr1=[1,2,3,4,5];
    const arr2=[...arr1];
    arr1.push(123);
    console.log('arr2:', arr2);

    //分割数组
    const arr1=[1,'2','3','4'];
    const [,...arr2]=arr1;
    console.log('arr2 :', arr2);

    //传递参数
    function add(x,y) {
        return x+y;
    }
    const arr=[1,2];
    console.log('add :', add(...arr));
}
//fill
{
    //数据重新填充
    const arr1 = [1, 2, 3, 4, 5];
    let arr2 = [...arr1].fill(3);
    console.log(arr2);//333333
    console.log([...arr1].fill(6, 0, 3))//66645
    const arr3 = [];
    console.log(arr3.fill(0, 0, 10));//[]
}

//find findIndex
{
    const arr = [{ name: "小明1", id: 1 }, { name: "小明2", id: 2 }, { name: "小明3", id: 3 }, { name: "小明4", id: 4 }]
    let res = arr.find(item => {
        return item.id === 3;
    })
    let resIndex = arr.findIndex(item => {
        return item.id === 3;
    })
    console.log(res,resIndex);
}

{
    //includes 和 indexOf
    const arr1 = [1, 2, 3, 4, 5];
    console.log(arr1.includes(3));
}

//flat(展开数组)
{
    let arr1=[1,2,3,[4,5,6,7],[[666,555]]];
    // let flatList=[].concat(...arr1);
    let flatList=arr1.flat(2);
    console.log(flatList);
}
{
    //map 数据映射
    let json = [
        { name: '小明1', age: 18, status: 1 },
        { name: '小明2', age: 18, status: 0 },
        { name: '小明3', age: 18, status: 1 }
    ]

    let res = json.map(v => {
        // 此种写法会改变原始数据v是一个引用
        // v.status = v.status ? '上线' : '下线'
        // return v;

        //使用Object.assign 深拷贝一个新的对象
        let obj = {};
        Object.assign(obj, v);
        obj.status = obj.status ? '上线' : '下线';
        return obj;
    })

    console.log('json :', json);
    console.log('res :', res);
}

{
    //reduce 对数组中的每一个元素进行一次回调,升序执行然后将回调值汇总一个返回值
    const str = 'abcdfgrsadvgshcvhsg';
    const res = str.split('').reduce((preV, curV) => {
        preV[curV] ? preV[curV]++ : preV[curV] = 1;
        return preV;
    }, {})
    console.log('res :', res);
}

{
    //展开多层数组
    const arr = [1, ['2nd', 2, 3, ['3nd', 4, 5]]];
    var deepFlat = function (list) {
        const res = list.reduce((preV, currV) => {
            return preV.concat(Array.isArray(currV) ?deepFlat(currV):currV)
        }, [])
        return res;
    }

    console.log(deepFlat(arr));

}
```