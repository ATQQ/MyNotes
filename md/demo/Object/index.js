// var obj = Object(1);
// console.log(obj instanceof Object);
// console.log(obj instanceof Number);
// console.log(obj === 1);//false
// var obj2 = new Object(obj);
// console.log(obj2);
// //var obj={} 等价于 var obj=new Object()
// /**
//  * 判断一个值是否是对象
//  * @param {Object} v 
//  */
// function isObject(v) {
//     return v === Object(v);
// }

// var testObj = {
//     name: "小明",
//     age: 19
// }
// console.log(Object.keys(testObj))
// console.log(Object.getOwnPropertyNames(testObj));
// for (const key in testObj) {
//     if (testObj.hasOwnProperty(key)) {
//         console.log("key:" + key + "--value:" + testObj[key])
//     }
// }

// var testObj = [
//     "小明",
//     19
// ]
// console.log(Object.keys(testObj))
// console.log(Object.getOwnPropertyNames(testObj));
// console.log(testObj.valueOf());

// console.log(Object.prototype.toString.call(testObj))
// var type = function (o) {
//     var s = Object.prototype.toString.call(o);
//     // console.log(s.match(/\[object (.*?)\]/));
//     return s.match(/\[object (.*?)\]/)[1].toLowerCase();
// };

// console.log(type({}));
//类型判断函数
// var type = function (o) {
//     var s = Object.prototype.toString.call(o);
//     return s.match(/\[object (.*?)\]/)[1].toLowerCase();
// };

// //判断某种类型数据的方法。
// ['Null',
//     'Undefined',
//     'Object',
//     'Array',
//     'String',
//     'Number',
//     'Boolean',
//     'Function',
//     'RegExp'
// ].forEach(function (t) {
//     type['is' + t] = function (o) {
//         return type(o) === t.toLowerCase();
//     };
// });

// type.isObject({}) // true
// type.isNumber(NaN) // true
// type.isRegExp(/abc/) // true

// var obj={
//     name:"小明"
// }
// console.log(Object.getOwnPropertyDescriptor(obj,"name"));
// var obj2=obj;
// obj2.name="小敏"
// console.log(obj);
// Array.isArray([])
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
// arr.sort((o1, o2) => {
//     return o1.age - o2.age
// })
arr.map((v)=>{
    v.age+=this[v.age%3];
    return v;
},[1,2,3])

