function isSameType(a, b) {
    // 两者都是值类型
    if (typeof a === typeof b && !(a instanceof Object) && !(b instanceof Object)) {
        return true
    }

    // 两者都是对象
    if (a instanceof Object && b instanceof Object) {
        let aOk = a instanceof Array
        let bOk = b instanceof Array
        // 都是数组,或者都不是数组则ok --> aOK === bOk
        return aOk === bOk
    }
    return false
}
console.log(isSameType(1, 2));
console.log(isSameType([], []));
console.log(isSameType(undefined, undefined));
console.log(isSameType(null, null));
console.log(isSameType('null', ''));
console.log(isSameType({}, {}));
console.log(isSameType(true, false));

console.log(isSameType(NaN, null));
console.log(isSameType(1, '2'));
console.log(isSameType(1, null));
console.log(isSameType(1, undefined));
console.log(isSameType(1, {}));
console.log(isSameType(1, []));
console.log(isSameType({}, []));
console.log(isSameType(null, []));


function isObject(a) {
    return a instanceof Object
}

function isValueType(a) {
    return !isObject(a)
}

function isSame(a, b) {
    // 为什么不用isNaN
    // 因为isNaN(undefined) 为true
    return (a === b) || (a !== a && b !== b)
}

function isEqual(a, b) {
    if (!isSameType(a, b)) {
        return false
    }
    // 都是数组
    if (Array.isArray(a)) {
        if (a.length !== b.length) {
            return false
        }

        // 逐项判断
        for (let i = 0; i < a.length; i++) {
            let _a = a[i]
            let _b = b[i]
            // 类型不等
            if (!isSameType(_a, _b)) {
                return false
            }

            // 值类型,值不等
            if (isValueType(_a) && !isSame(_a, _b)) {
                return false
            }

            // 对象 - 递归判断了
            if (isObject(_a) && !isEqual(_a, _b)) {
                return false
            }
        }
    }
    else {
        // 都是普通对象
        let aKeys = Reflect.ownKeys(a)
        let bKeys = Reflect.ownKeys(b)

        // 键数量不一致
        if (aKeys.length !== bKeys.length) {
            return false
        }

        for (const aKey of aKeys) {
            let _a = a[aKey]
            let _b = b[aKey]
            // 类型不等
            if (!isSameType(_a, _b)) {
                return false
            }

            // 值类型,值不等
            if (isValueType(_a) && !isSame(_a, _b)) {
                return false
            }

            // 对象 - 递归判断了
            if (isObject(_a) && !isEqual(_a, _b)) {
                return false
            }
        }
    }

    return true
}

console.log(isSame(1, 1));
console.log(isSame(NaN, NaN));
console.log(isSame('', ''));
console.log(isSame(true, true));
console.log(isSame(null, null));
console.log(isSame(1, undefined));

console.log(isSame(false, true));
console.log(isSame(null, undefined));

console.log(isEqual([], []));
console.log(isEqual([], [1]));
console.log(isEqual({ age: [1, 2, { data: [1, 2, 3], name: 'a' }], name: 'xm' }, { name: 'xm', age: [1, 2, { name: 'a', data: [1, 2, 3] }] }));


function duplicate(arr) {
    // 存放最终结果
    const res = []
    // 遍历咱们的原数组
    for (const a of arr) {
        // 判断是否存在
        let isExist = res.findIndex(b => {
            // 这里就变成了当前项与原来的每一项进行比较
            if (!isSameType(a, b)) {
                return false
            }
            if (isValueType(a) && !isSame(a, b)) {
                return false
            }

            if (isObject(a) && !isEqual(a, b)) {
                return false
            }

            return true
        }) !== -1

        // 不存在则放入
        if (!isExist) {
            res.push(a)
        }
    }
    return res
}

console.log(duplicate([1, 2, '1', '2', 1, null, null, undefined, undefined, {}, {}, [], [], [1], [1], [1, 2], [2, 1], ['1'], ['1'], { age: [1, 2, { data: [1, 2, 3], name: 'a' }], name: 'xm' }, { name: 'xm', age: [1, 2, { name: 'a', data: [1, 2, 3] }] }, false, false, NaN,NaN, true, true]));

console.log(isSameType(NaN,NaN));
console.log(isSame(null,NaN));
console.log(isSame(undefined,NaN));