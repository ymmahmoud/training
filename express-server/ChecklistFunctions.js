const { pool } = require("./database.js");

const getChecklistTemplates = async () => {
    const checklists = [];
    let conn;
    try {
        conn = await pool.getConnection();
        const items = await conn.query("SELECT checklistItems.id, text, active, credentials.name as credential, sections.name as section from checklistItems\
        LEFT JOIN credentials ON credentials.id = checklistItems.credentialId\
        LEFT JOIN sections ON sectionId = sections.id WHERE active = 1\
        ORDER BY credentials.name, sections.name;");
        // Get rid of metadata as we just don't care
        delete items.meta;
        let checklist = {role: items[0].credential, sections: []};
        let section = {name: items[0].section, items: []};
        for (const item of items){
            // We make a new checklist object if the roles differ
            if (item.credential != checklist.role){
                checklist.sections.push(section);
                checklists.push(checklist);
                checklist = {role: item.credential, sections: []};
                section = {name: item.section, items: []};
            }
            // If the section is different we create a new one
            if (item.section != section.name){
                checklist.sections.push(section);
                section = {name: item.section, items: []};
            }
            section.items.push(item.text);
        }
        // Push the stuff at the end
        checklist.sections.push(section);
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