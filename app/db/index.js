let sqlite3 = require('sqlite3').verbose();

/*
 * Database configuration
 */





module.exports = {

    db: new sqlite3.Database('./app/data/training_latest.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the SQlite database.');
    })

};