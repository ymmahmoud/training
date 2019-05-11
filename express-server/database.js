const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'database', 
    user:'root', 
    password: 'root',
    database: 'training',
    connectionLimit: 5
});

module.exports = { pool };