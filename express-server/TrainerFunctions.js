const { pool } = require('./database.js');

const signItem = async (trainerId, itemId, itemStatus, comments) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const updatedItem = await conn.query("UPDATE usersChecklistItems SET status = ?, comments = ?,\
         trainer = ?, date = ? WHERE checklistItemId = ?", [itemStatus, comments, trainerId, new Date(), itemId]);
        return updatedItem;
    }catch (err) {
        console.error(err);
        return null;
    } finally {
        if (conn) {
            conn.end();
        }
    }

};

module.exports = {signItem};