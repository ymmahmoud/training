const { pool }  = require( "./database.js");
const cachios = require('cachios');

const verifyToken = (token) => {
    const request_url = 'https://oauth2.googleapis.com/tokeninfo?id_token=' + token;
    return cachios.get(request_url).then((resp) => {
        // const user = JSON.parse(resp.data);
        return resp.data;
    }).catch((err) => {
        console.error(err);
        return null;
    });
};

const createUser = async (id) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let user = await conn.query("SELECT * FROM users WHERE googleUserId = ?", id);
        if (user) {
            return user;
        }else{
            await conn.query("INSERT INTO users (googleUserId, radioNum, active, admin) VALUES (?, ?, ?, ?)", [id, null, 1, 0]);
            return await conn.query("SELECT * FROM users WHERE googleUserId = ?", id);
        }
    } catch (err) {
        return null;
    } finally {
        if (conn) {
            conn.end();
        }
    }
};

const findUser = async (id) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let user = await conn.query("SELECT * FROM users WHERE googleUserId = ?", id);
        if (user) {
            return user;
        }else{
            return null;
        }
    } catch (err) {
        return null;
    } finally {
        if (conn) {
            conn.end();
        }
    }
};

module.exports = { verifyToken, createUser, findUser };