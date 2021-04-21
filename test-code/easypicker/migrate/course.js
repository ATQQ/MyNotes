const { course, user } = require('./../data')
const { insertTableByModel } = require('../utils/sqlUtil')
const { query } = require('../utils/mysql')
const { getUniqueKey } = require('../utils/stringUtil')


const [u1] = user
function insertCategory(category) {
    const { sql, params } = insertTableByModel('category', category)
    return query(sql, ...params)
}

async function insertTask(task) {
    const data = Object.assign({
        k: getUniqueKey()
    }, task)
    const { sql, params } = insertTableByModel('task', data)
    // 新增附加属性
    await insertTaskInfo({
        taskKey: data.k,
        userId: data.userId
    })
    return query(sql, ...params)
}

function insertTaskInfo(taskInfo) {
    const data = Object.assign({
        limitPeople: 0,
        template: '',
        rewrite: 0,
        format: '',
        info: JSON.stringify(['姓名']),
        shareKey: getUniqueKey(),
        ddl: null
    }, taskInfo)
    const { sql, params } = insertTableByModel('task_info', data)
    return query(sql, ...params)
}

function findUserCategoryAndTask(u, courseList) {
    const parentList = courseList.filter(c => {
        return c.type === '1' && c.username === u.username
    })
    return parentList.reduce((pre, cur) => {
        const children = []
        const p = { ...cur, children }
        const childList = courseList.filter(v => v.parent === cur.id)
        children.push(...childList)
        pre.push(p)
        return pre
    }, [])
}

async function migrateUserCourse(u, course) {
    const categoryAndTasks = findUserCategoryAndTask(u, course)
    for (const c of categoryAndTasks) {
        const categoryOptions = {
            user_id: u.id,
            k: getUniqueKey(),
            name: c.name
        }
        await insertCategory(categoryOptions)
        const { children } = c
        for (const child of children) {
            const ops = {
                id: child.id,
                name: child.name,
                categoryKey: categoryOptions.k,
                userId: categoryOptions.user_id
            }
            await insertTask(ops)
        }
    }
}

module.exports = {
    migrateUserCourse
}