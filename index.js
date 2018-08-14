const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = process.argv[2] || 8000;

const dbConfig = require('./app/db/');


/* Express configuration */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var server = app.listen(port, () => {
    console.log('RestAPI live on port ' + port);

    //db.test();


});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.header("Content-Type", "application/json");
    console.log(req.url, req.method);

    next();
})

require('./app/routes')(app, dbConfig.db);
