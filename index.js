const express = require('express');
const bodyParser = require('body-parser');
const proxy = require('express-http-proxy');
const path = require('path');

const env = require("./environment/environment");

const nano = require("nano")(env.couchdb.uri)
const port = process.argv[2] || 8000;
const dbConfig = require('./app/db/');
const psConfig = require('./app/paperspace/');
const filesConfig = require('./app/files/');



//console.log(env);

var cors = require('cors');
const app = express();

/* Express configuration */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var server = app.listen(port, () => {
    console.log('RestAPI live on port ' + port);
});
app.use(cors());
app.use('/files/', express.static(env.files.uri));
app.use('/couchdb', proxy(env.couchdb.uri));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    console.log(req.url, req.method);

    next();
})



require('./app/routes')(app, { db: dbConfig.db, nano: nano });
