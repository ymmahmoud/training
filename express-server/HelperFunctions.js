const { pool } = require('./database.js');

const roleNameToAbbr = async (roleName) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let roleAbbr = await conn.query("SELECT abbr FROM credentials WHERE name=?", roleName);
        delete roleAbbr.meta;
        roleAbbr = roleAbbr[0];
        return roleAbbr ? roleAbbr.abbr : null;
    } catch (err) {
        console.error(err);
        return null;
    } finally {
        if (conn) {
            conn.end();
        }
    }
};

module.exports = { roleNameToAbbr };