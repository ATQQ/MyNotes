function* gen() {
    yield Promise.resolve(2)
    yield 2
}

const i = gen()