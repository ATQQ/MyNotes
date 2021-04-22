const { migrateUser } = require('./user')
const { migrateUserCourse } = require('./course')
const { migrateChildContent } = require('./childContent')
const { migratePeopleList } = require('./peopleList')
const { migrateReports,migrateReportsDate } = require('./reports')
const { user, course, childContent, peopleList, report } = require('./../data')

    ; (async () => {
        let i = 0
        for (const u of user) {
            console.log(++i,u.username);
            console.time(u.username)
            // await migrateUser(u)
            // await migrateUserCourse(u, course)
            await migratePeopleList(u,peopleList)
            // await migrateReports(u,report)
            // await migrateReportsDate(u,report)
            console.timeEnd(u.username)
        }
        // console.time('childContent')
        // await migrateChildContent(childContent)
        // console.timeEnd('childContent')
        // console.log('------success---------');
    })()