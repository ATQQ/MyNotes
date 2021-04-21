const crypto = require('crypto')
const { ObjectId } = require('mongodb')
const path = require('path')
/**
 * 加密字符串(md5+base64)
 * @param str 待加密的字符串
 */
function encryption(str) {
    return crypto.createHash('md5').update(str).digest('base64')
}

function lowCamel2Underscore(word) {
    const letters = word.split('')
    return letters.reduce((pre, letter) => {
        return pre + (/[A-Z]/.test(letter) ? `_${letter.toLowerCase()}` : letter)
    }, '')
}

function getUniqueKey() {
    return new ObjectId().toHexString()
}

function getKeyInfo(key) {
    const { name, base, ext } = path.parse(key)
    return {
        name, base, ext
    }
}

module.exports = {
    encryption,
    getKeyInfo,
    getUniqueKey,
    lowCamel2Underscore
}