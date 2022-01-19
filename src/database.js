const mysql = require('mysql');
const { promisify } = require('util');

const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOLE_CONNECTION_LOST') {
            console.err('Database connection was closed');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.err('Database has to many connections');
        }
        if (err.code === 'ECONNREFUSED') {
            console.err('Database connection was refused');
        }
    }

    if (connection)
        connection.release();
    console.log('DB is connected');
    return;

});

pool.query = promisify(pool.query);

module.exports = pool;