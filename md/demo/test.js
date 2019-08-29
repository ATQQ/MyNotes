const fib = (n) => {
    if (n === 1) {
        return 1;
    }
    if (n === 2) {
        return 2;
    }

    return fib(n - 1) + fib(n - 2);
}

// console.log(fib(800))

let map = new Map([[1, 1], [2, 2]]);
const fib2 = (n) => {
    if (map.has(n)) {
        return map.get(n);
    }

    map.set(n, fib2(n   - 1)+fib2(n - 2))
    return map.get(n);
}

console.log(fib2(100));
// console.log(fib(100));