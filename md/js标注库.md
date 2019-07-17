# Object对象
## 概述
* JavaScript 的所有其他对象都继承自Object对象，即那些对象都是Object的实例。
* bject对象的原生方法
  * Object本身的方法
  * Object的实例方法
### Object本身的方法
* Object.print(o)
  ```js
    Object.print = function (o) { console.log(o) };
  ```
* Object的实例方法
    ```js
    Object.prototype.print = function () {
        console.log(this);
    };

    var obj = new Object();
    obj.print() // Object
    ```
## Object() 
Object本身是一个函数，可以当作工具方法使用，将任意值转为对象。这个方法常用于保证某个值一定是对象。

**如果参数是原始类型的值，Object方法将其转为对应的包装对象的实例**
```js
var obj = Object(1);
obj instanceof Object // true
obj instanceof Number // true

var obj = Object('foo');
obj instanceof Object // true
obj instanceof String // true

var obj = Object(true);
obj instanceof Object // true
obj instanceof Boolean // true
```
**如果Object方法的参数是一个对象，它总是返回该对象，即不用转换。**
```js
var arr = [];
var obj = Object(arr); // 返回原数组
obj === arr // true

var value = {};
var obj = Object(value) // 返回原对象
obj === value // true

var fn = function () {};
var obj = Object(fn); // 返回原函数
obj === fn // true
```
利用这一点，可以写一个判断变量是否为对象的函数
```js
function isObject(v){
    return v===Object(v);
}
```
## Object 构造函数
```js
var o1 = {a: 1};
var o2 = new Object(o1);
o1 === o2 // true

var obj = new Object(123);
obj instanceof Number // true
```
Object构造函数的用法与工具方法很相似，几乎一模一样。使用时，可以接受一个参数，如果该参数是一个对象，则直接返回这个对象；如果是一个原始类型的值，则返回该值对应的包装对象
>//var obj={} 等价于 var obj=new Object()

## Object静态方法
### Object.keys()与Object.getOwnPropertyNames()
Object.keys方法和Object.getOwnPropertyNames方法都用来遍历对象的属性。

Object.keys方法的参数是一个对象，返回一个数组。该数组的成员都是该对象自身的（而不是继承的）所有属性名。
```js
var testObj={
    name:"小明",
    age:19
}
console.log(Object.keys(testObj))
console.log(Object.getOwnPropertyNames(testObj));
```
对于一般的对象来说，Object.keys()和Object.getOwnPropertyNames()返回的结果是一样的。只有涉及不可枚举属性时，才会有不一样的结果。Object.keys方法只返回可枚举的属性（详见《对象属性的描述对象》一章），Object.getOwnPropertyNames方法还返回不可枚举的属性名。
```js
var obj = {
  p1: 123,
  p2: 456
};

Object.keys(obj).length // 2
Object.getOwnPropertyNames(obj).length // 2
```
## [更多方法](https://wangdoc.com/javascript/stdlib/object.html#%E6%A6%82%E8%BF%B0)
### Object.prototype.valueOf()
valueOf方法的作用是返回一个对象的“值”，默认情况下返回对象本身。
```js
var obj = new Object();
obj.valueOf = function () {
  return 2;
};

1 + obj // 3
```
上面代码自定义了obj对象的valueOf方法，于是1 + obj就得到了3。这种方法就相当于用自定义的obj.valueOf，覆盖Object.prototype.valueOf。

### Object.prototype.toString()
toString方法的作用是返回一个对象的字符串形式，默认情况下返回类型字符串。
### toString() 的应用：判断数据类型
Object.prototype.toString方法，所以为了得到类型字符串，最好直接使用Object.prototype.toString方法。通过函数的call方法，可以在任意值上调用这个方法，帮助我们判断这个值的类型。
```js
Object.prototype.toString.call(value)
```
不同数据类型的Object.prototype.toString方法返回值如下。
* 数值：返回[object Number]。
* 字符串：返回[object String]。
* 布尔值：返回[object Boolean]。
* undefined：返回[object Undefined]。
* null：返回[object Null]。
* 数组：返回[object Array]。
* arguments 对象：返回[object Arguments]。
* 函数：返回[object Function]。
* Error 对象：返回[object Error]。
* Date 对象：返回[object Date]。
* RegExp 对象：返回[object RegExp]。
* 其他对象：返回[object Object]。
```js
  Object.prototype.toString.call(2) // "[object Number]"
Object.prototype.toString.call('') // "[object String]"
Object.prototype.toString.call(true) // "[object Boolean]"
Object.prototype.toString.call(undefined) // "[object Undefined]"
Object.prototype.toString.call(null) // "[object Null]"
Object.prototype.toString.call(Math) // "[object Math]"
Object.prototype.toString.call({}) // "[object Object]"
Object.prototype.toString.call([]) // "[object Array]"
```
利用这个特性，可以写出一个比typeof运算符更准确的类型判断函数
```js
var type = function (o){
  var s = Object.prototype.toString.call(o);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};

type({}); // "object"
type([]); // "array"
type(5); // "number"
type(null); // "null"
type(); // "undefined"
type(/abcd/); // "regex"
type(new Date()); // "date"
```
## Object.prototype.hasOwnProperty()

# [属性](https://wangdoc.com/javascript/stdlib/attributes.html)
```js
{
  value: 123,
  writable: false,
  enumerable: true,
  configurable: false,
  get: undefined,
  set: undefined
}
```
## Object.getOwnPropertyDescriptor()
Object.getOwnPropertyDescriptor()方法可以获取属性描述对象。它的第一个参数是目标对象，第二个参数是一个字符串，对应目标对象的某个属性名。
```js
var obj = { p: 'a' };

Object.getOwnPropertyDescriptor(obj, 'p')
```
**注意，Object.getOwnPropertyDescriptor()方法只能用于对象自身的属性，不能用于继承的属性。**

# 数组Array
### 实例函数
* push()
  * push方法用于在数组的末端添加一个或多个元素，并返回添加新元素后的数组长度。注意，该方法会改变原数组。
* pop()
  * pop方法用于删除数组的最后一个元素，并返回该元素。注意，该方法会改变原数组。

**push和pop结合使用，就构成了“后进先出”的栈结构（stack）。**
* shift()
  * shift()方法用于删除数组的第一个元素，并返回该元素。注意，该方法会改变原数组。
* unshift()
  * 方法用于在数组的第一个位置添加元素，并返回添加新元素后的数组长度。注意，该方法会改变原数组。
  
**push()和shift()结合使用，就构成了“先进先出”的队列结构（queue）。**
* join()
  * join()方法以指定参数作为分隔符，将所有数组成员连接为一个字符串返回。如果不提供参数，默认用逗号分隔。
* concat()
  *  concat方法用于多个数组的合并。它将新数组的成员，添加到原数组成员的后部，然后返回一个新数组，原数组不变。
  * 如果数组成员包括对象，concat方法返回当前数组的一个浅拷贝。所谓“浅拷贝”，指的是新数组拷贝的是对象的引用。
* reverse()
  * reverse方法用于颠倒排列数组元素，返回改变后的数组。注意，该方法将改变原数组。
* slice() 
  * slice方法用于提取目标数组的一部分，返回一个新数组，原数组不变。
  * arr.slice(start, end);
  * 它的第一个参数为起始位置（从0开始），第二个参数为终止位置（但该位置的元素本身不包括在内）。如果省略第二个参数，则一直返回到原数组的最后一个成员。
* splice()
  * splice方法用于删除原数组的一部分成员，并可以在删除的位置添加新的数组成员，返回值是被删除的元素。注意，该方法会改变原数组。
  * arr.splice(start, count, addElement1, addElement2, ...);
  * 如果只是单纯地插入元素，splice方法的第二个参数可以设为0。
* sort()
  * sort方法对数组成员进行排序，默认是按照字典顺序排序。排序后，原数组将被改变
  * sort的参数函数本身接受两个参数，表示进行比较的两个数组成员。如果该函数的返回值大于0，表示第一个成员排在第二个成员后面；其他情况下，都是第一个元素排在第二个元素前面。
  * ```js
    var arr = [1, 3, 2, 6, 7, 8, 23, 11];
    arr.sort((a, b) => {
        return a - b;
    })
    console.log(arr);
    arr = [
        {
            name: "小王",
            age: 19
        },
        {
            name: "小王a",
            age: 1
        },
        {
            name: "小王是",
            age: 16
        },
        {
            name: "小天",
            age: 12
        },
        {
            name: "小刚",
            age: 193
        },
        {
            name: "小红",
            age: 129
        }
    ]
    arr.sort((o1, o2) => {
        return o1.age - o2.age
    })
    ```
* map()
  * map方法将数组的所有成员依次传入参数函数，然后把每一次的执行结果组成一个新数组返回。
  * ```js
    arr.map((elem,index.arr)=>{
      //some
      return elem
    })
    ```
  * map方法的回调函数有三个参数，elem为当前成员的值，index为当前成员的位置，arr为原数组
  * map方法还可以接受第二个参数，用来绑定回调函数内部的this变量
  * ```js
     var arr = ['a', 'b', 'c'];
    [1, 2].map(function (e) {
      return this[e];
    }, arr)
    // ['b', 'c']
     ```
* forEach()
  * forEach方法与map方法很相似，也是对数组的所有成员依次执行参数函数。但是，forEach方法不返回值，只用来操作数据。这就是说，如果数组遍历的目的是为了得到返回值，那么使用map方法，否则使用forEach方法。
  * forEach方法也可以接受第二个参数，绑定参数函数的this变量。
  ```js
    var out = [];
    [1, 2, 3].forEach(function(elem) {
      this.push(elem * elem);
    }, out);

    out // [1, 4, 9]
  ```
  * 注意，forEach方法无法中断执行，总是会将所有成员遍历完。如果希望符合某种条件时，就中断遍历，要使用for循环。
* filter()
  * filter方法用于过滤数组成员，满足条件的成员组成一个新数组返回。

  * 它的参数是一个函数，所有数组成员依次执行该函数，返回结果为true的成员组成一个新数组返回。该方法不会改变原数组。
  * ```js
    [1, 2, 3, 4, 5].filter(function (elem) {
     return (elem > 3);
    })
    // [4, 5]
    [1, 2, 3, 4, 5].filter(function (elem,  index, arr) {
      return index % 2 === 0;
    });
    // [1, 3, 5]
    ```
* some()，every()
  * 这两个方法类似“断言”（assert），返回一个布尔值，表示判断数组成员是否符合某种条件。

  * 它们接受一个函数作为参数，所有数组成员依次执行该函数。该函数接受三个参数：当前成员、当前位置和整个数组，然后返回一个布尔值。
  * some方法是只要一个成员的返回值是true，则整个some方法的返回值就是true，否则返回false。
  * every方法是所有成员的返回值都是true，整个every方法才返回true，否则返回false。
* reduce()，reduceRight()
  * reduce方法和reduceRight方法依次处理数组的每个成员，最终累计为一个值。它们的差别是，reduce是从左到右处理（从第一个成员到最后一个成员），reduceRight则是从右到左（从最后一个成员到第一个成员），其他完全一样。
  * reduce方法和reduceRight方法的第一个参数都是一个函数。该函数接受以下四个参数。
    * 累积变量，默认为数组的第一个成员
    * 当前变量，默认为数组的第二个成员
    * 当前位置（从0开始）
    * 原数组
  * ```js
    [1,2,3,4,5].reduce((a,b)=>{
    console.log(a+"--"+b);
    return a+b;
    },100)
    //115
    ```
* indexOf()，lastIndexOf()
  * indexOf方法返回给定元素在数组中第一次出现的位置，如果没有出现则返回-1
  * lastIndexOf方法返回给定元素在数组中最后一次出现的位置，如果没有出现则返回-1。
  * indexOf方法还可以接受第二个参数，表示搜索的开始位置。
## 链式使用
```js
var users = [
  {name: 'tom', email: 'tom@example.com'},
  {name: 'peter', email: 'peter@example.com'}
];

users
.map(function (user) {
  return user.email;
})
.filter(function (email) {
  return /^t/.test(email);
})
.forEach(function (email) {
  console.log(email);
});
// "tom@example.com"
```

# 包装对象
所谓“包装对象”，指的是与数值、字符串、布尔值分别相对应的Number、String、Boolean三个原生对象。这三个原生对象可以把原始类型的值变成（包装成）对象。
## 实例方法
* valueOf()
  * valueOf()方法返回包装对象实例对应的原始类型的值。
* toString()
  * toString()方法返回对应的字符串形式。
## 自定义方法
我们可以新增一个double方法，使得字符串和数字翻倍。
```js
String.prototype.double = function () {
  return this.valueOf() + this.valueOf();
};

'abc'.double()
// abcabc

Number.prototype.double = function () {
  return this.valueOf() + this.valueOf();
};

(123).double() // 246
```
# Number
## 实例方法
* Number.prototype.toString()
  * Number对象部署了自己的toString方法，用来将一个数值转为字符串形式。
  * toString方法可以接受一个参数，表示输出的进制。如果省略这个参数，默认将数值先转为十进制，再输出字符串；否则，就根据参数指定的进制，将一个数字转化成某个进制的字符串。
* Number.prototype.toFixed() 
  * toFixed()方法先将一个数转为指定位数的小数，然后返回这个小数对应的字符串。
  * toFixed()方法的参数为小数位数，有效范围为0到20，超出这个范围将抛出 RangeError 错误。
* Number.prototype.toExponential()
  * toExponential方法用于将一个数转为科学计数法形式。
  * toExponential方法的参数是小数点后有效数字的位数，范围为0到20，超出这个范围，会抛出一个 RangeError 错误。
* Number.prototype.toPrecision()
  * toPrecision方法用于将一个数转为指定位数的有效数字。
  * toPrecision方法的参数为有效数字的位数，范围是1到21，超出这个范围会抛出 RangeError 错误。

  * toPrecision方法用于四舍五入时不太可靠，跟浮点数不是精确储存有关。
# String
## 实例方法
  * charAt
  * charCodeAt()
    * charCodeAt方法返回字符串指定位置的 Unicode 码点（十进制表示），相当于String.fromCharCode()的逆操作。
  * concat() 
    * concat方法用于连接两个字符串，返回一个新字符串，不改变原字符串。
  * slice()
    * slice方法用于从原字符串取出子字符串并返回，不改变原字符串。它的第一个参数是子字符串的开始位置，第二个参数是子字符串的结束位置（不含该位置）。
  * substring()
    * 跟slice()方法类似
    * 如果第一个参数大于第二个参数，substring方法会自动更换两个参数的位置。
  * substr()
    * substr方法的第一个参数是子字符串的开始位置（从0开始计算），第二个参数是子字符串的长度。
  * indexOf(),lastIndexOf()
    * indexOf方法用于确定一个字符串在另一个字符串中第一次出现的位置，返回结果是匹配开始的位置。如果返回-1，就表示不匹配。
    * indexOf方法还可以接受第二个参数，表示从该位置开始向后匹配。
    * 另外，lastIndexOf的第二个参数表示从该位置起向前匹配。
    * trim()
      * trim方法用于去除字符串两端的空格，返回一个新字符串，不改变原字符串
    * toLowerCase()
    * toUpperCase()
      * toLowerCase方法用于将一个字符串全部转为小写，toUpperCase则是全部转为大写。它们都返回一个新字符串，不改变原字符串。
    * match()
      * match方法用于确定原字符串是否匹配某个子字符串，返回一个数组，成员为匹配的第一个字符串。如果没有找到匹配，则返回null。
      * 返回的数组还有index属性和input属性，分别表示匹配字符串开始的位置和原始字符串。
    * search()
      * search方法的用法基本等同于match，但是返回值为匹配的第一个位置。如果没有找到匹配，则返回-1。
    * replace()
      * replace方法用于替换匹配的子字符串，一般情况下只替换第一个匹配
    * split()
      * split方法按照给定规则分割字符串，返回一个由分割出来的子字符串组成的数组。
      * 如果分割规则为空字符串，则返回数组的成员是原字符串的每一个字符。
      * 如果省略参数，则返回数组的唯一成员就是原字符串。
      * split方法还可以接受第二个参数，限定返回数组的最大成员数。
    * localeCompare()
      * localeCompare方法用于比较两个字符串。它返回一个整数，如果小于0，表示第一个字符串小于第二个字符串；如果等于0，表示两者相等；如果大于0，表示第一个字符串大于第二个字符串。
      * 该方法的最大特点，就是会考虑自然语言的顺序。
      * localeCompare还可以有第二个参数，指定所使用的语言（默认是英语），然后根据该语言的规则进行比较。
## Math
### 静态属性
* Math.E：常数e。
* Math.LN2：2 的自然对数。
* Math.LN10：10 的自然对数。
* Math.LOG2E：以 2 为底的e的对数。
* Math.LOG10E：以 10 为底的e的对数。
* Math.PI：常数π。
* Math.SQRT1_2：0.5 的平方根。
* Math.SQRT2：2 的平方根。

### 静态方法
* Math.abs()：绝对值
* Math.ceil()：向上取整(天花板)
* Math.floor()：向下取整(地板值)
* Math.max()：最大值
  * Math.max(value...)
  * Math.max(3.2..-1,0);//3
* Math.min()：最小值
* Math.pow()：指数运算
  * Math.pow(2, 3) // 8
* Math.sqrt()：平方根
* Math.log()：自然对数
  * Math.log(Math.E) // 1
* Math.exp()：e的指数
* Math.round()：四舍五入
* Math.random()：随机数
  * Math.random()返回0到1之间的一个伪随机数，可能等于0，但是一定小于1。
  * ```js
    任意范围的随机数生成函数如下。
    function getRandomArbitrary(min,  max) {
      return Math.random() * (max - min) + min;
    }

    getRandomArbitrary(1.5, 6.5)
    ```

# Date对象
## 构造函数的用法 
```js
// 参数为时间零点开始计算的毫秒数
new Date(1378218728000)
// Tue Sep 03 2013 22:32:08 GMT+0800 (CST)

// 参数为日期字符串
new Date('January 6, 2013');
// Sun Jan 06 2013 00:00:00 GMT+0800 (CST)

// 参数为多个整数，
// 代表年、月、日、小时、分钟、秒、毫秒
new Date(2013, 0, 1, 0, 0, 0, 0)
// Tue Jan 01 2013 00:00:00 GMT+0800 (CST)
```
## 关于Date的几点说明
* 参数可以是负整数，代表1970年元旦之前的时间。
* 只要是能被Date.parse()方法解析的字符串，都可以当作参数。
  * ```js
    new Date('2013-2-15')
    new Date('2013/2/15')
    new Date('02/15/2013')
    new Date('2013-FEB-15')
    new Date('FEB, 15, 2013')
    new Date('FEB 15, 2013')
    new Date('February, 15, 2013')
    new Date('February 15, 2013')
    new Date('15 Feb 2013')
    new Date('15, February, 2013')
    // Fri Feb 15 2013 00:00:00 GMT+0800 (CST)
    ```
* 月份从0开始计算，但是，天数从1开始计算。另外，除了日期的默认值为1，小时、分钟、秒钟和毫秒的默认值都是0。
## [静态方法](https://wangdoc.com/javascript/stdlib/date.html#to-%E7%B1%BB%E6%96%B9%E6%B3%95)
* Date.now()
  * Date.now方法返回当前时间距离时间零点（1970年1月1日 00:00:00 UTC）的毫秒数，相当于 Unix 时间戳乘以1000。
* Date.parse() 
  * Date.parse方法用来解析日期字符串，返回该时间距离时间零点（1970年1月1日 00:00:00）的毫秒数。
  * 日期字符串应该符合 RFC 2822 和 ISO 8061 这两个标准，即YYYY-MM-DDTHH:mm:ss.sssZ格式，其中最后的Z表示时区。但是，其他格式也可以被解析，请看下面的例子。
  * ```js
    Date.parse('Aug 9, 1995')
    Date.parse('January 26, 2011 13:51:50')
    Date.parse('Mon, 25 Dec 1995 13:30:00 GMT')
    Date.parse('Mon, 25 Dec 1995 13:30:00 +0430')
    Date.parse('2011-10-10')
    Date.parse('2011-10-10T14:48:00')
    ```
* Date.UTC()
  * Date.UTC方法接受年、月、日等变量作为参数，返回该时间距离时间零点（1970年1月1日 00:00:00 UTC）的毫秒数。
  *  格式
    Date.UTC(year, month[, date[, hrs[, min[, sec[, ms]]]]])
