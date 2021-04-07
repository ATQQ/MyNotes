Object.defineProperty(Object.prototype,'__proto__',{
    get(){
        return this
    }
})

let c = (function () {
    var fun = { name: 123, b:456 }

    return {
        run: function (k) {
            return fun[k]
        }
    }
})()

console.log(c.run('__proto__'));