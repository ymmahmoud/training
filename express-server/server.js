const express = require('express');
require('dotenv').config();
//needed for cors, will remove in production
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const { pool } = require('./database.js');
const { verifyToken, createUser, getUserInfo, findUser, getAllUsers} = require('./UserFunctions.js');
const { getChecklistTemplates, updateChecklists, getUserChecklist, getAllUserChecklists } = require ('./ChecklistFunctions.js');
const { roleNameToAbbr } = require ('./HelperFunctions.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.get('/user/all', async (req, res) => {
    const users = await getAllUsers();
    res.send(users);
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
        // We will put all the newly inserted item ids in here so we can then update the user's checklists
        const itemIds = [];
        conn = await pool.getConnection();
        const credID = (await conn.query("SELECT id FROM credentials WHERE abbr = ?", req.body.role))[0].id;
        for (const section of req.body.sections) {
            await conn.query("INSERT INTO sections (name) VALUES (?);", section.name);
            const sectionID = (await conn.query("SELECT LAST_INSERT_ID() as id;"))[0].id;
            for (const item of section.items) {
                await conn.query("INSERT INTO checklistItems (credentialId, sectionId, text, active) VALUES (?, ?, ?, ?);", [credID, sectionID, item, 1]);
                itemIds.push((await conn.query("SELECT LAST_INSERT_ID() as id;"))[0].id);
            }
        }
        updateChecklists(credID, itemIds);
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

app.post('/checklist/user', async (req, res) => {
    if(req.body['token'] && req.body['credential']){
        const user = await verifyToken(req.body.token);
        if (user) {
            const userId = (await findUser(user.sub))[0].id;
            const checklist = await getUserChecklist(userId, req.body['credential']);
            if (checklist){
                res.send({success: true, checklist: checklist, message: "Succesfully retrieved checklist!"}); 
            }else{
                res.send({success: false, checklist: null, message: "Hmm. There does not appear to be a checklist for that credential, if you believe this an error please contact a dev!"}); 
            }
        }else{
            res.send({success: false, checklist: null, message: "We could not verify your user token!"}); 
        }
    }else{
        res.send({success: false, checklist: null, message: "You did not send over your user token and / or credential abbreviation!"});
    }
});


// Gets all the checklists which the user has
app.post('/checklist/user-all', async (req, res) => {
    if(req.body['token']){
        const user = await verifyToken(req.body.token);
        if (user) {
            const userId = (await findUser(user.sub))[0].id;
            const checklists = await getAllUserChecklists(userId);
            if (checklists){
                res.send({success: true, checklists: checklists, message: "Succesfully retrieved checklists!"}); 
            }else{
                res.send({success: false, checklists: null, message: "Hmm. There does not appear to be any checklists for that user, if you believe this an error please contact a dev!"}); 
            }
        }else{
            res.send({success: false, checklists: null, message: "We could not verify your user token!"}); 
        }
    }else{
        res.send({success: false, checklists: null, message: "You did not send over your user token and / or credential abbreviation!"});
    }
});

app.get('/role/abbreviation', async (req, res) => {
    if(req.query['name']) {
        const abbr = await roleNameToAbbr(decodeURIComponent(req.query['name']));
        if (abbr) {
            res.send({success:true, abbr: abbr, message: ""});
        } else {
            res.send({success:false, abbr: null, message: "No role found!"});
        }
    } else {
        res.send({success:false, abbr: null, message: "No name specified!"});
    }
});

app.get('/', (req, res) => res.send('Hello World123!'))

app.listen(port, '0.0.0.0', () => console.log(`Training app listening on port ${port}!`))
