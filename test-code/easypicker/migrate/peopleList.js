const { insertTableByModel, selectTableByModel } = require('../utils/sqlUtil')
const { query } = require('../utils/mysql')
const { getUniqueKey } = require('../utils/stringUtil')
const { peopleList } = require('../data')

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

function insertPeople(people) {
    const { sql, params } = insertTableByModel('people', people)
    return query(sql, ...params)
}

function findUserPeople(u, people) {
    return people.filter(p => {
        return p.admin_username === u.username
    })
}
let sum = 0
async function migratePeopleList(u, people) {
    const peopleList = findUserPeople(u, people)
    sum+=peopleList.length
    console.log(sum);
    const { id: userId } = u
    for (const p of peopleList) {
        const { people_name, parentName, childName, status, last_date } = p
        const [category] = await selectCategory({
            userId,
            name: parentName
        })

        const [task] = await selectTask({
            userId,
            name: childName,
            categoryKey: category.k
        })
        await insertPeople({
            taskKey: task.k,
            userId,
            name: people_name,
            status,
            submitDate: last_date,
            submitCount: +status
        })
    }
}

module.exports = {
    migratePeopleList
}