# 新的字符串方法
```js
// //es5
{
    var a = 'a'
    var str = '\u20bb7'//最大只支持4位Unicode
    console.log(str);

}

//es6
{
    const str = '\u{20bb7}'//通过{xxxxx}解决
    console.log(str);
}

//新的遍历方法
{
    const str = '\u{20bb7}'
    for (let i = 0; i < str.length; i++) {
        console.log('for',str[i]);
    }
    for (const word of str) {
        console.log('for of',word);
    }
}

//新的字符串方法
{
    let str='hello world';
    // 判断是否包含
    console.log('includes',str.includes('hello'))
    //判断是否以xxx开始
    console.log('starstWith',str.startsWith('hello'))
    console.log('starstWith', str.startsWith('world',6))
    // 判断是否以xxx结束
    console.log('endsWith',str.endsWith('world'))
    console.log('endsWith', str.endsWith('hello',5));
}

//字符串重复
{
    let str='hello';
    str=str.repeat(3);
    console.log(str); //hellohellohello
}

// 头部补全
{
    let str='-'
    //用hello去补全,补全后的长度8
    str=str.padStart(8,'hello')
    console.log(str);
}

// //尾部补全
{
    let str = '-'
    str = str.padEnd(8, 'hello')
    console.log(str);
}

// 模板字符串
{
    const name='小明',age=12;
    const str=`我叫${name}今年${age}岁`;
    console.log(str);
}
```