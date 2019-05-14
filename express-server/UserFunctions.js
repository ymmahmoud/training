const { pool }  = require( "./database.js");
const { createUserChecklists } = require("./ChecklistFunctions.js");
const cachios = require('cachios');
const PERSON_API_TOKEN = process.env.PERSON_API_TOKEN;

const verifyToken = (token) => {
    const request_url = 'https://oauth2.googleapis.com/tokeninfo?id_token=' + token;
    return cachios.get(request_url).then((resp) => {
        return resp.data;
    }).catch((err) => {
        console.error(err);
        return null;
    });
};

const getUserInfo = async (googleUserId) => {
    const request_url = `https://lp12.rpiambulance.com/api/person/v1/get/user/${googleUserId}?token=${PERSON_API_TOKEN}`;
    try {
        const resp = await cachios.get(request_url);
        return resp.data.data;
    } catch (err) {
        console.error(err);
        return null;    
    }
}

const createUser = async (googleUserId) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let user = await conn.query("SELECT * FROM users WHERE googleUserId = ?", googleUserId);
        delete user.meta;
        if (user.length == 0) {
            await conn.query("INSERT INTO users (googleUserId, radioNum, active, admin) VALUES (?, ?, ?, ?)", [googleUserId, null, 1, 0]);
            user = await conn.query("SELECT * FROM users WHERE googleUserId = ? LIMIT 1", googleUserId);
            await createUserChecklists(user[0].id);
        }
        delete user.meta;
        return user;
    } catch (err) {
        console.error(err);
        return null;
    } finally {
        if (conn) {
            conn.end();
        }
    }
};

const findUser = async (googleUserId) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let user = await conn.query("SELECT * FROM users WHERE googleUserId = ?", googleUserId);
        delete user.meta;
        if (user.length != 0) {
            return user;
        }else{
            return null;
        }
    } catch (err) {
        console.error(err);
        return null;
    } finally {
        if (conn) {
            conn.end();
        }
    }
};

module.exports = { verifyToken, createUser, findUser, getUserInfo};