// function User(name, age, type, works) {
//     this.name = name
//     this.age = age
//     this.type = type
//     this.works = works
// }

// function userFactory(name, age, type) {
//     const worksObj = {
//         'teacher': ['传道', '授业', '解惑'],
//         'student': ['上课', '写作', '课外实践'],
//         // ... any more
//     }
//     return new User(name, age, type, worksObj[type] || [])
// }
// const s1 = userFactory('小明',18,'student')
// const t1 = userFactory('王刚',28,'teacher')

// function Circle(){
//     this.name = 'circle'
//     this.r = 0
// }

// function Triangle(){
//     this.name = 'triangle'
//     this.a = 0
//     this.b = 0
//     this.c = 0
// }

// function Rectangle(){
//     this.name = 'rectangle'
//     this.width = 0
//     this.height = 0
// }

// function shapeFactory(shape){
//     switch(shape){
//         case 'circle':return new Circle()
//         case 'triangle':return new Triangle()
//         case 'rectangle':return new Rectangle()
//         default: return null;
//     }
// }

// const c1 = shapeFactory('circle')
// const t1 = shapeFactory('triangle')
// const r1 = shapeFactory('rectangle')

// console.log(c1,t1,r1);


// class AbstractSystemFactory {
//     userFactory() {
//         throw new Error('不允许直接调用抽象工程方法')
//     }

//     logFactory() {
//         throw new Error('不允许直接调用抽象工程方法')
//     }
// }

// class TradingSystem extends AbstractSystemFactory {
//     userFactory() {
//         return new TradingSystemUserFactory()
//     }

//     logFactory() {
//         // 类似实现
//     }
// }

// class AbstractSystemUserFactory {
//     createUser() {
//         throw new Error('不允许直接调用抽象工程方法')
//     }
// }

// class TradingSystemUserFactory extends AbstractSystemUserFactory {
//     createUser(name, age) {
//         return new TradingSystemUser(name, age)
//     }
// }

// class TradingSystemUser {
//     constructor(name, age) {
//         this.name = name
//         this.age = age
//     }
//     printInfo() {
//         console.log(this.name, this.age);
//     }
// }

// const tradingSystem = new TradingSystem()
// const tradingSystemUserFactory = tradingSystem.userFactory()

// const tsu1 = tradingSystemUserFactory.createUser('xm',18)
// tsu1.printInfo()

// function User() {
//     if (!(this instanceof User)) {
//         return
//     }
//     if (!User._instance) {
//         this.name = '无名'
//         User._instance = this
//     }
//     return User._instance
// }

// const u1 = new User()
// const u2 = new User()

// console.log(u1===u2);

// function User(){
//     this.name = '无名'
// }
// User.getInstance = function(){
//     if(!User._instance){
//         User._instance = new User()
//     }
//     return User._instance
// }

// function User() {
//     this.name = '无名'
// }
// User.getInstance = (function () {
//     var instance
//     return function () {
//         if (!instance) {
//             instance = new User()
//         }
//         return instance
//     }
// })()
// class User{
//     constructor(){
//         if(new.target !== User){
//             return
//         }
//         if(!User._instance){
//             this.name = 'xm'
//             User._instance = this
//         }
//         return User._instance
//     }
// }

// const u1 = new User()
// const u2 = new User()
// class User {
//     constructor() {
//         this.name = 'xm'
//     }
//     static getInstance() {
//         if (!User._instance) {
//             User._instance = new User()
//         }
//         return User._instance
//     }
// }


// const u1 = User.getInstance()
// const u2 = User.getInstance()

// const User = (function () {
//     function _user() {
//         this.name = 'xm'
//     }
//     return function () {
//         if (!_user.instance) {
//             _user.instance = new _user()
//         }
//         return _user.instance
//     }
// })()

// const u1 = new User()
// const u2 = new User()

function SingleWrapper(cons) {
    if (!(cons instanceof Function) || !cons.prototype) {
        throw new Error('不是合法的构造函数')
    }
    var instance
    return function () {
        if (!instance) {
            instance = new cons()
        }
        return instance
    }
}
function User(){
    this.name = 'xm'
}
const SingleUser = SingleWrapper(User)
const u1 = new SingleUser()
const u2 = new SingleUser()
console.log(u1 === u2);