const DaoError = require('./daoError');
const request = require("request");

class CouchDao {

    constructor(nano, dbName) {
        console.debug("CouchDao constructor");
        this.nano = nano
        this.couchDb = nano.use(dbName);

    }

    all() {
        let that = this;
        return new Promise(function (resolve, reject) {
            console.log(that)
            that.couchDb.list({ include_docs: true }, function (err, result, header) {
                if (err) {
                    console.error(err);
                    reject(
                        new DaoError(20, "Internal server error")
                    );
                } else if (result === null || result.rows === null) {
                    reject(
                        new DaoError(21, "Entity not found ")
                    );
                } else {
                    //console.log("all", result)
                    const docs = result.rows.map((row) => {
                        return row.doc
                    })

                    resolve(docs);
                    //return resolve(that.bulk(docs))
                }
            })
        });
    }

    bulk(docs) {
        let that = this;
        return new Promise(function (resolve, reject) {
            console.log("bulk", docs);
            that.couchDb.bulk({ docs: docs }, function (err, result, header) {
                if (err) {
                    console.error(err);
                    reject(
                        new DaoError(20, "Internal server error")
                    );
                } else if (result === null || result.length === 0) {
                    reject(
                        new DaoError(21, "Entity not found ")
                    );
                } else {
                    resolve(result);
                }
            })
        });
    }

    find(query) {
        //console.log(sqlRequest, sqlParams);
        let that = this;
        return new Promise(function (resolve, reject) {

            that.couchDb.find(query, function (err, rows) {
                if (err) {
                    console.log(err)
                    reject(
                        new DaoError(11, "Invalid arguments", query)
                    );
                } else if (rows === null || rows.length === 0) {
                    console.log("Entity not found");
                    reject(
                        new DaoError(21, "Entity not found ", query)
                    );
                } else {
                    resolve(rows);
                }
            })
        });
    }

    findOne(sqlRequest, sqlParams) {
        let that = this;
        return new Promise(function (resolve, reject) {
            let stmt = that.couchDb.prepare(sqlRequest);
            stmt.all(sqlParams, function (err, rows) {
                //console.debug(err, rows)
                if (err) {
                    reject(
                        new DaoError(11, "Invalid arguments", sqlRequest, sqlParams)
                    );
                } else if (rows === null || rows.length === 0) {
                    reject(
                        new DaoError(21, "Entity not found ", sqlRequest, sqlParams)
                    );
                } else {
                    //console.debug(rows)
                    let row = rows[0];
                    resolve(row);
                }
            })
        });
    }



    run(sqlRequest, sqlParams) {
        let that = this;
        return new Promise(function (resolve, reject) {

            let stmt = that.couchDb.prepare(sqlRequest);
            stmt.run(sqlParams, function (err) {
                //console.log(this);
                if (this.changes > 0) {
                    resolve(sqlParams);
                } else if (this.changes === 0) {
                    reject(
                        new DaoError(21, "Entity not found", sqlRequest, sqlParams)
                    )
                } else {
                    console.log(err);
                    reject(
                        new DaoError(11, "Invalid arguments", sqlRequest, sqlParams)
                    )
                }
            })
        });
    }





}

module.exports = CouchDao;