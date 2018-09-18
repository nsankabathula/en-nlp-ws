const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
const path = require('path');


const port = process.argv[2] || 8000;

const dbConfig = require('./app/db/');


/* Express configuration */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var server = app.listen(port, () => {
    console.log('RestAPI live on port ' + port);

    //db.test();


});
app.use(cors());
app.use('/files/', express.static("C:\\Users\\nsankabathula\\Downloads\\agreement_data\\Agreements\\"));
/*
app.use('files/pdf/', express.static("C:\\Users\\nsankabathula\\Downloads\\agreement_data\\Agreements\\"));
app.use("/files/pdf/",
    express.static(path.join(__dirname, 'app/data/'), {
        //express.static("app/data/", {
        setHeaders: function (res, path, stat) {
            console.log(path);

        }
    }));
*/
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    //res.header("Content-Type", "application/json");
    console.log(req.url, req.method, req.body);
    //console.log(req)

    next();
})



require('./app/routes')(app, dbConfig.db);
