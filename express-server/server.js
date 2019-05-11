const express = require('express');
require('dotenv').config();
//needed for cors, will remove in production
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const { pool } = require('./database.js');
const { verifyToken, createUser, getUserInfo} = require('./UserFunctions.js');
const { getChecklistTemplates } = require ('./ChecklistFunctions.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Export the connection information to use elsewhere
module.exports = { pool };
// Because angular is hosted on a separate server, angular will be hosted together on production run
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.post('/user/verify', async (req, res) => {
    if(req.body['token'] != null) {
        const user = await verifyToken(req.body['token']);
        if (user) {
            res.send({success: true, user: user.sub, message: "Succesfully verified token!"});
        }else {
            res.send({success: false, user: null, message: "Unable to verify token!"});
        }
    }else {
        res.send({success: false, user: null, message: "Token not specified!"});
    }
});

app.get('/user/info', async (req, res) => {
    if(req.query['id']){
        const user = await getUserInfo(req.query['id']);
        if (user){
            res.send({success: true, user: user, message: "Info successfully retrieved!"});
        }else{
            res.send({success: false, user: null, message: "Unable to retrieve info on user!"});
        }
    }else{
        res.send({success: false, user: null, message: "No id specified!"});
    }
});

app.post('/user/create', async (req, res) => {
    if(req.body['id'] != null){
        const user = await createUser(req.body['id']);
        res.send({success: true, user: user[0], message: "User successfully found or created!"});
    } else {
        res.send({success: false, user: null, message: "No id specified!"});
    }
});

app.post('/checklist/create', async (req, res) => {
    let message = "";
    let success = true;
    let conn;
    try {
        conn = await pool.getConnection();
        const credID = await conn.query("SELECT id FROM credentials WHERE abbr = ?", req.body.role);
        for (item of req.body.items) {
            await conn.query("INSERT INTO checklistItems (credentialId, text, active) VALUES (?, ?, ?)", [credID[0].id, item, 1]);
        }
        success = true;
        message = "Successfully created checklist!";
    } catch (err) {
        success = false;
        message = err + "\n If you believe this is incorrect please contact the dev team!";
    } finally {
        if (conn){
            conn.end();
        }
        res.send({success: success, msg: message});
    }
});

app.get('/checklist/templates', async (req, res) => {
    res.send(await getChecklistTemplates());
});


app.get('/', (req, res) => res.send('Hello World123!'))

app.listen(port, '0.0.0.0', () => console.log(`Training app listening on port ${port}!`))
