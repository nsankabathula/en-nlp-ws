var cbr = require('couchdb-backup-restore');
var fs = require('fs')

var config = { credentials: 'http://localhost:5984', databases: ["default-nlp"] };

function done(err) {
    if (err) {
        return console.error(err);
    }
    console.log('all done!');
}

// backup
cbr.backup(config, done).pipe(fs.createWriteStream('./couchdb/db-backup.tar.gz'))