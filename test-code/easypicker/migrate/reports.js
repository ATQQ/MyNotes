const { insertTableByModel, selectTableByModel, updateTableByModel } = require('../utils/sqlUtil')
const { query } = require('../utils/mysql')
const { getUniqueKey } = require('../utils/stringUtil')
const { batchFileStatus } = require('../utils/qiniuUtil')
function insertFile(file) {
    const { sql, params } = insertTableByModel('files', file)
    return query(sql, ...params)
}

function selectCategory(options) {
    const { sql, params } = selectTableByModel('category', {
        data: options
    })
    return query(sql, ...params)
}

function selectTask(options) {
    const { sql, params } = selectTableByModel('task', {
        data: options
    })
    return query(sql, ...params)
}

function selectFiles(options) {
    const { sql, params } = selectTableByModel('files', {
        data: options
    })
    return query(sql, ...params)
}


function updateFile(file, q) {
    const { sql, params } = updateTableByModel('files', file, q)
    return query(sql, ...params)
}

function findUserReports(u, reports) {
    return reports.filter(r => {
        return r.username === u.username
    })
}

let sum = 0
async function migrateReports(u, reports) {
    const reportList = findUserReports(u, reports)
    // sum += reportList.length
    // console.log(sum);
    const { id: userId } = u
    for (const r of reportList) {
        const { course, tasks, filename, date, username, name } = r
        const [category] = await selectCategory({
            userId,
            name: course
        })
        if (!category) {
            continue
        }
        const [task] = await selectTask({
            userId,
            name: tasks,
            categoryKey: category.k
        })
        if (!task) {
            continue
        }
        const oldKey = `${username}/${course}/${tasks}/${filename}`
        // qiniu云上查一下
        const [resBody] = await batchFileStatus([oldKey])
        console.log(++sum);
        console.log(oldKey);
        console.log(resBody);
        let { code, data: { md5, fsize: size } } = resBody
        if (!md5) {
            md5 = 'no_exist'
        }
        if (!size) {
            size = 0
        }
        console.log(md5, size);
        await insertFile({
            taskKey: task.k,
            task_name: task.name,
            // 存放老版本的key
            category_key: oldKey,
            userId,
            name: filename,
            info: JSON.stringify([{ "text": "姓名", "value": name }]),
            hash: md5,
            size,
            people: name,
            date
        })
    }
}
let i = 0
async function migrateReportsDate(u, reports) {
    const reportList = findUserReports(u, reports)
    // sum += reportList.length
    // console.log(sum);
    const { id: userId } = u
    for (const r of reportList) {
        const { course, tasks, filename, date, username, name } = r
        const [category] = await selectCategory({
            userId,
            name: course
        })
        if (!category) {
            continue
        }
        const [task] = await selectTask({
            userId,
            name: tasks,
            categoryKey: category.k
        })
        if (!task) {
            continue
        }
        const oldKey = `${username}/${course}/${tasks}/${filename}`
        const files = await selectFiles({
            categoryKey: oldKey
        })
        if (files.length >= 0) {
            console.log(++i, date, oldKey);
            await updateFile({
                date
            }, {
                categoryKey: oldKey
            })
        }
    }
}

module.exports = {
    migrateReports,
    migrateReportsDate
}