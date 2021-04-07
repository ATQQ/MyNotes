function request(options = {}) {
    console.log(new Date(), '发起一次请求', '-------参数为:', options.query)
    return new Promise(res => {
        const { query } = options
        if (!query) {
            res({ data: {} })
            return
        }

        const ids = query.split(',')
        const testData = ids.reduce((pre, id) => {
            pre[id] = {
                id,
                rand: Math.random()
            }
            return pre
        }, {})

        // 模拟延迟
        setTimeout(() => {
            res({
                code: 0,
                data: testData,
                errMsg: 'ok'
            })
        }, 500)
    })
}
var getArticle = (function () {
    let timer = null;
    let resolveMap = new Map();
    return function (id) {
        return new Promise((resolve) => {
            // 这里用string类型作为key
            const key = `${id}`;
            const resolves = resolveMap.get(key);

            // 不存在则创建,因为可能有重复的id,所以这里value为数组
            if (!resolves) {
                resolveMap.set(key, [resolve]);
            } else {
                // 存在则加入,因为是对象,map里存的引用,所以这里不需要重新执行set
                resolves.push(resolve)
            }

            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                // 这里将把请求发出去,需要重置状态
                // 所以将现有的保存下来
                const _resolvesMap = resolveMap

                const keys = [..._resolvesMap.keys()]
                request({
                    url: '/path',
                    query: keys.join(',')
                }).then(res => {
                    const { data } = res
                    // 执行resolve
                    for (const key of keys) {
                        const resolves = _resolvesMap.get(key)
                        const v = data[key]
                        resolves.forEach(r => r(v))
                    }
                })


                // 请求发出后就初始化
                timer = null;
                resolveMap = new Map();
            })
        });
    };
})();


getArticle(1).then(console.log)
getArticle(3).then(console.log)
getArticle(2).then(console.log)
getArticle(2).then(console.log)
getArticle(1).then(console.log)

new Promise((res) => {
    getArticle(4).then(console.log)
    res()
})

setTimeout(() => {
    getArticle(1).then(console.log)
    getArticle(3).then(console.log)
    getArticle(2).then(console.log)
    getArticle(2).then(console.log)
    getArticle(1).then(console.log)
}, 400)