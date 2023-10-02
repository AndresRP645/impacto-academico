module.exports = {
    database: {
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWD,
        database: DB,
        ssl:{"rejectUnauthorized":true}
    }
}
