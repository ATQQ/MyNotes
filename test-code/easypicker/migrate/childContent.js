const { childContent } = require('./../data')
const { updateTableByModel, selectTableByModel } = require('../utils/sqlUtil')
const { query } = require('../utils/mysql')


function selectTask(options) {
    const { sql, params } = selectTableByModel('task', {
        data: options
    })
    return query(sql, ...params)
}

async function updateTaskInfo(taskInfo, q) {
    const { sql, params } = updateTableByModel('task_info', taskInfo, q)
    return query(sql, ...params)
}




async function migrateChildContent(children) {
    for (const child of children) {
        const { tasksid, template, ddl, people } = child
        const [task] = await selectTask({
            id: tasksid
        })
        if (task) {
            const { k, user_id } = task
            await updateTaskInfo({
                template,
                ddl,
                limitPeople: people ? 1 : 0
            },{
                taskKey:k,
                user_id
            })
        }
    }
}

module.exports = {
    migrateChildContent
}