const { insertTableByModel } = require('../utils/sqlUtil')
const { query } = require('../utils/mysql')

function insertUser(options) {
    const modal = Object.assign({}, options)
    const { sql, params } = insertTableByModel('user', modal)
    return query(sql, ...params)
}
// 逐渐个迁移用户的脚本
function migrateUser(u){
    const options = {
        id:u.id,
        account:u.username,
        password:u.password,
        phone:u.mobile,
        joinTime:u.date
    }
    return insertUser(options)
}


module.exports = {
    migrateUser
}