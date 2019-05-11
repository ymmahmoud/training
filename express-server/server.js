const express = require('express');
//needed for cors, will remove in production
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const { pool } = require('./database.js');
const { verifyToken, createUser } = require('./UserFunctions.js');

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

app.post('/user/info', async (req, res) => {
    if(req.body['id'] != null) {
        const user = await verifyToken(req.body['id']);
        if (user) {
            res.send({sucess: true, user: user, message: "Succesfully verified token!"});
        }else {
            res.send({sucess: false, user: user, message: "Unable to verify token!"});
        }
    }else {
        res.send({sucess: false, user: null, message: "Token not specified!"});
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
        sucess = true;
        message = "Successfully created checklist!";
    } catch (err) {
        sucess = false;
        message = err + "\n If you believe this is incorrect please contact the dev team!";
    } finally {
        if (conn){
            conn.end();
        }
        res.send({success: sucess, msg: message});
    }
});


app.get('/', (req, res) => res.send('Hello World123!'))

app.listen(port, '0.0.0.0', () => console.log(`Training app listening on port ${port}!`))
