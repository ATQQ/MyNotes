// 引入utils中的解密的方法
const { decrypt } = require('../utils')

// 这个我猜测应该是一些服务方法
module.exports = (app) => ({
    /**
     * 登录检查
     * @returns 
     */
    // 将传入的参数直接进行解构
    loginCheck: async ({ name = '', password = '', roleId }) => {
        // 这个应该是用了个数据库操作的框架,看上去数据库使用的关系型数据库
        // 查询user表中userName = name，roleId =  roleId ，del = false 的内容
        // 等价 sql ：select * from user where userName = name and roleId = roleId and del = false 
        const info = await app.$model.user.findOne({ raw: true, where: { userName: name, roleId, del: false } })

        // 查询结果为空则直接返回
        if (info === null) return null

        // 解构获取密码，其余参数放入rest对象中
        const { password: info_password, ...rest } = info

        // 比较传入的密码与实际查询到的密码解密后是否相等，相等则返回查询到的信息，不等则返回null
        return decrypt(info_password) === decrypt(password) ? info : null
    },
    /**
     * 判断用户是否存在
     * @param {object} param0 
     * @returns 
     */
    isUserExist: async ({ userName }) => {
        // 在user表中查询userName 等于 userName的项
        const nameList = await app.$model.user.findAll({ raw: true, where: { userName } })
        // 如果查询结果条数大于0 返回true 否则 false
        return nameList.length > 0
    },
    /**
     * 用户注册
     * @param {object} info 
     * @returns {boolean}
     */
    register: async (info) => {
        // 将传入信息直接存入user表中
        await app.$model.user.create(info)
        // 返回true
        return true
    },
    /**
     * 获取user表中的所有数据
     */
    getAll: async () => await app.$model.user.findAll({ where: { del: false } }),
    /**
     * 根据id更新user表中的某一项
     * @returns 更新结果
     */
    update: async ({ id, ...data }) => await app.$model.user.update(data, { where: { id } }),
})

// 解构示例
const demo = ({ name, age }) => {
    console.log(name, age);
}
const obj = { name: 'xm', age: 18 }
demo(obj)

const demo2 = (t) => {
    const { name: otherName, ...rest } = t
    console.log(otherName);
    console.log(rest);
}
demo2(obj)