let sqlite3 = require('sqlite3').verbose();
const env = require("../../environment/environment");
/*
 * Database configuration
 */





module.exports = {

    db: new sqlite3.Database(env.traningdb.uri, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the SQlite database.');
    })

};