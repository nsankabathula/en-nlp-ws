var cbr = require('couchdb-backup-restore');
var fs = require('fs')

var config = { credentials: 'http://admin:admin@localhost:5984' };

function done(err) {
    if (err) {
        return console.error(err);
    }
    console.log('all done!');
}

// restore
fs.createReadStream('./couchdb/db-backup.tar.gz').pipe(cbr.restore(config, done));