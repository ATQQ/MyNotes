const mysql = require('mysql')
const { mysqlConfig } =require('./config')
// 创建连接池
const pool = mysql.createPool(mysqlConfig)

let coonection = null

function getConnection() {
    return new Promise((res, rej) => {
        if(coonection){
            res(coonection)
            return
        }
        pool.getConnection((err, coon) => {
            if (err) {
                console.error('------ db connection error -------')
                console.error(err)
                rej(err)
                return
            }
            coonection = coon
            res(coon)
        })
    })
}


pool.on('error', function (err) {
    console.log('pool connect error')
    console.error(err)
})

/**
 * 执行sql语句
 * @param sql sql语句 
 * @param params 参数 
 */
function query(sql, ...params) {
    return new Promise((resolve, reject) => {
        getConnection().then((coon) => {
            coon.query(sql, params, (err, result) => {
                if (err) {
                    reject(err)
                    return
                }
                // 请求完就释放
                // coon.release()
                resolve(result)
            })
        }).catch((err) => {
            reject(err)
        })
    })
}

module.exports = {
    query,
    getConnection
}