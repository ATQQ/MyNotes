const{lowCamel2Underscore} = require('./stringUtil')

function selectTableByModel(table, options) {
    const { columns = [] } = options
    let { data = {} } = options
    if (!isObject(data)) return { sql: '', params: [] }
    data = removeUndefKey(data)

    const column = (columns.length > 0) ? `${columns.join(',')}` : '*'
    const keys = Object.keys(data)
    const where = (keys.length > 0) ? `where ${keys.map(key => createWhereSql(key, data[key])).join(' and ')}` : ''
    const values = keys.map(key => data[key]).flat()
    const sql = `select ${column} from ${table} ${where}`.trim()
    return {
        sql,
        params: values
    }
}

function deleteTableByModel(table, model) {
    if (!isOkModel(model)) return { sql: '', params: [] }
    model = removeUndefKey(model)

    const keys = Object.keys(model)
    const where = `where ${keys.map(key => createWhereSql(key, model[key])).join(' and ')}`
    const values = keys.map(key => model[key]).flat()
    const sql = `delete from ${table} ${where}`.trim()
    return {
        sql,
        params: values
    }
}

function insertTableByModel(table, model) {
    if (!isOkModel(model)) return { sql: '', params: [] }
    model = removeUndefKey(model)

    const keys = Object.keys(model)
    const values = keys.map(key => model[key])

    const sql = `insert into ${table} (${keys.map(lowCamel2Underscore).join(',')}) values (${new Array(keys.length).fill('?').join(',')})`
    return {
        sql,
        params: values
    }
}

function insertTableByModelMany(table, model) {
    if (model.length === 0 || !isOkModel(model[0])) return { sql: '', params: [] }
    const keys = Object.keys(model[0])

    const values = model.reduce((pre, value) => {
        return pre.concat(keys.map(key => value[key]))
    }, [])
    const sqlValues = `values ${Array.from({ length: model.length }).map(() => (`(${new Array(keys.length).fill('?').join(',')})`)).join(',')}`
    const sql = `insert into ${table} (${keys.map(lowCamel2Underscore).join(',')}) ${sqlValues}`
    return {
        sql,
        params: values
    }
}

function updateTableByModel(table, model, query) {
    if (!isOkModel(model) || !isOkModel(query)) return { sql: '', params: [] }
    model = removeUndefKey(model)
    query = removeUndefKey(query)

    const updateModelKeys = Object.keys(model)
    let values = updateModelKeys.map(key => model[key])
    const queryModelKeys = Object.keys(query)
    values = values.concat(queryModelKeys.map(key => query[key]).flat())

    const where = `where ${queryModelKeys.map(key => createWhereSql(key, query[key])).join(' and ')}`
    const sql = `update ${table} set ${updateModelKeys.map(key => `${lowCamel2Underscore(key)} = ?`).join(',')} ${where}`
    return {
        sql,
        params: values
    }
}

function isObject(data) {
    return data instanceof Object && typeof data !== 'function'
}

function isOkModel(model) {
    return isObject(model) && Object.keys(removeUndefKey(model)).length !== 0
}

function removeUndefKey(obj) {
    return Object.keys(obj).reduce((pre, k) => {
        if (obj[k] !== undefined) {
            pre[k] = obj[k]
        }
        return pre
    }, {})
}

function createWhereSql(k, v) {
    if (!isObject(v)) {
        return `${lowCamel2Underscore(k)} = ?`
    }
    if (Array.isArray(v)) {
        return `${lowCamel2Underscore(k)} in (${Array.from({ length: v.length }).fill('?').join(',')})`
    }
    throw new Error('not support Object')
}

module.exports = {
    updateTableByModel,
    insertTableByModel,
    insertTableByModelMany,
    deleteTableByModel,
    selectTableByModel
}