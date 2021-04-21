const { random, round } = Math

/**
 * 随机生成一个指定长度的数字串
 * @param length 
 */
function randomNumStr(length){
    let str = '',
        i = 0
    while (i < length) {
        i++
        str += round(random() * 100) % 10
    }
    return str
}

module.exports = {
    randomNumStr
}