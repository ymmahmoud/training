const { pool } = require("./database.js");

const getChecklistTemplates = async () => {
    const checklists = [];
    let conn;
    try {
        conn = await pool.getConnection();
        let items = await conn.query("SELECT checklistItems.id, text, active, credentials.name from checklistItems\
        LEFT JOIN credentials ON credentials.id = checklistItems.credentialId\
        WHERE active = 1 ORDER BY credentials.name;");
        // Get rid of metadata as we just don't care
        delete items.meta;
        let checklist = {role: items[0].name, items: []};
        let currentRole = items[0].name;
        for (const item of items) {
            // New checklist since they're grouped :)
            if (item.name !== currentRole){
                checklists.push(checklist);
                checklist = {role: item.name, items: []};
                currentRole = item.name;
            }
            // We used the name now we don't need anymore
            delete item.name;
            checklist.items.push(item);
        }
        checklists.push(checklist);
        return checklists;
    } catch (err) {
        console.error(err);
        return null;
    } finally {
        if (conn) {
            conn.end();
        }
    }
};

const updateChecklist = async (id) => {

};


module.exports = { getChecklistTemplates };