const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

require('dotenv').config();


const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 3000;


app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
  });
//app.use(cors);

require('./database/index.js');

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("Welcome");
})


app.listen(PORT, () => console.log(`Now listening `));

module.exports = app;

