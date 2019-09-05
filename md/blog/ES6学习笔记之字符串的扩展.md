# 字符串的for of
ES6 为字符串添加了遍历器接口，使得字符串可以被for...of循环遍历。
```js
const str='abcd';
for(let s of str){
     console.log(s)
}
```
---

# :sparkles:模板字符串
```js
//es5
var name='小明',
age=18;
console.log('我叫'+name+'今年'+age+'岁')

//es6
console.log(`我叫${name}今年${age}岁`);
```
>注意:模板字符串使用 <code>``</code>,即不是双引号<code>""</code>,也不是单引号<code>''</code>

><code>``</code>通常在键盘左上角<code>ESC</code>按键下方
---
# 新增字符串方法
## String.includes(searchStr)
* 描述:判断是否含有目标字符串searchStr
* ```js
  {
      const str='hello world';
      console.log(str.includes('hello'));//true
  }
  ```
## String.startsWith(searchStr,position?)
* 描述:判断字符串是否以searchStr开头,第二个参数position(可选)默认为0,表示从第几个字符开始向后判断
* ```js
  {
      const str='hello world';
      console.log(str.startsWith('hello'));//true
      console.log(str.startsWith('abc'));//false
      console.log(str,startsWith('hello',1));//false
      console.log(str,startsWith('world',6));//true
  }
  ```
## String.endsWith(searchStr,position?)
* 描述:判断字符串是否以searchStr结尾,同样第二个参数position(可选)默认为原字符串长度,表示从第几个字符开始向前判断
* ```js
  {
      const str='hello world';
    console.log('endsWith', str.endsWith('world'));//true
    console.log('endsWith', str.endsWith('abc'));//false
    console.log('endsWith', str.endsWith('world',11));//true
    console.log('endsWith', str.endsWith('hello', 5));//true
    console.log('endsWith', str.endsWith('hello', 7));//false
    
  }
  ```
## String.repeat(n)
  * 描述:repeat方法返回一个新字符串，表示将原字符串重复n次。
```js
    let str='abcd';
    str=str.repeat(3);
    console.log(str);//abcdabcdabcd
```
---
## ES2017 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。
### 1.String.padStart(length,fillStr?)头部补全
### 2.String.padEnd(length,fillStr?) 尾部补全
* length:   补全后的字符串长度
* fillstr:  用于填充的字符串,默认为空格
```js
    let str='5678'
    console.log(str.padStart(8,'abc'));//abca5678
    console.log(str.padEnd(8,'abc'));//5678abca
```
### 实例
```js
//提示日期
    let str = '08-12'
    console.log(str.padStart(10, 'yyyy-MM-dd'));//yyyy-08-12
```
---
## ES2019 对字符串实例新增了trimStart()和trimEnd()这两个方法。它们的行为与trim()一致，trimStart()消除字符串头部的空格，trimEnd()消除尾部的空格。它们返回的都是新字符串，不会修改原始字符串。
```js
const s = '  abcd  ';
s.trim() //"abcd"
s.trimStart() //"abc  "
s.trimEnd() //"  abc"
```