const { migrateUser } = require('./user')
const { migrateUserCourse } = require('./course')
const { migrateChildContent } = require('./childContent')
const { migratePeopleList } = require('./peopleList')
const { migrateReports } = require('./reports')
const { user, course, childContent,peopleList,report } = require('./../data')

    ; (async () => {
        for (const u of user) {
            console.time(u.username)
            // await migrateUser(u)
            // await migrateUserCourse(u,course)
            // await migratePeopleList(u,peopleList)
            await migrateReports(u,report)
            console.timeEnd(u.username)
        }
        // console.time('childContent')
        // await migrateChildContent(childContent)
        // console.timeEnd('childContent')
    })()