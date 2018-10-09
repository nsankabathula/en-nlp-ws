const Error = require('./error');

class CouchDaoError extends Error {
    constructor(errorCode, message, db, query, values) {
        super(errorCode, message)
        this.db = db;
        this.query = query;
        this.values = values;
    }
}

module.exports = CouchDaoError;