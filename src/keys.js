const dotenv = require('dotenv').config();
module.exports = {
    database: {
        host: process.env.HOST || 'localhost', 
        user: process.env.USER || 'root',
        password: process.env.PASSWD || '',
        database: process.env.DB || 'impactoacademico',
        ssl:{
            rejectUnauthorized: true
        }
    }
}
