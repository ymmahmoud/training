const express = require('express');
//needed for cors, will remove in production
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const request = require('request');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// We should probably a .then and a .catch, but I didn't bother
mongoose.connect('mongodb://database:27017/training', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

// Because angular is hosted on a separate server, angular will be hosted together on production run
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.post('/user/info', (req, res) => {
    if(req.body['id'] != null){
        const request_url = 'https://oauth2.googleapis.com/tokeninfo?id_token=' + req.body['id'];
        request(request_url, (err, response, body) => {
            if(!err) {
                const user = JSON.parse(body);
                res.send({sucess:true, usr:user.email, msg:"User sucessfully verified!"});
            }else{
                res.send({sucess:false, usr:null, msg:"Unable to verify token!"});
            }
        });
    }else{
        res.send({sucess:false, usr:null, msg:"No ID token specified!"});
    }
});

app.get('/', (req, res) => res.send('Hello World123!'))

app.listen(port, '0.0.0.0', () => console.log(`Training app listening on port ${port}!`))
