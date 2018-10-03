let sqlite3 = require('sqlite3').verbose();
const dbConfig = require("./db.json")
/*
 * Database configuration
 */





module.exports = {

    db: new sqlite3.Database(dbConfig[0]["training.db"], sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the SQlite database.');
    })

};