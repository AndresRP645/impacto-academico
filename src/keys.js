module.exports = {
    database: {
        host: process.env.HOST || "localhost",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_NAME || "impactoacademico",
        ssl:{
            rejectUnauthorized: true
        }
    }
}