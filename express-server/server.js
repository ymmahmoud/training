const express = require('express');
//needed for cors, will remove in production
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
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

app.get('/', (req, res) => res.send('Hello World123!'))

app.listen(port, '0.0.0.0', () => console.log(`Training app listening on port ${port}!`))
