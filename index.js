const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
const path = require('path');


const port = process.argv[2] || 8000;

const dbConfig = require('./app/db/');
const psConfig = require('./app/paperspace/');
const filesConfig = require('./app/files/');



/* Express configuration */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var server = app.listen(port, () => {
    console.log('RestAPI live on port ' + port);
});
app.use(cors());
app.use('/files/', filesConfig.files);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    console.log(req.url, req.method, req.body);

    next();
})



require('./app/routes')(app, dbConfig.db);
