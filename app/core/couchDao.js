const DaoError = require('./daoError');
const request = require("request");

const attachments = function (couchDb, params, result) {
    const rows = result.rows.map((row) => {
        row.value.url = couchDb.config.url + "/" + couchDb.config.db + "/" + row.value.url
        return row.value
    })


    result.rows = [].concat(rows)
    return result;
}
const COUCHDB_VIEW_DICT = {
    config: { designName: "config", viewName: "config-view", transform: null, opts: { include_docs: true } },
    master: { designName: "metadata", viewName: "master-view", transform: null, opts: { include_docs: true } },
    attachments: { designName: "metadata", viewName: "meta-view", transform: attachments, opts: { include_docs: false } },
    sents: { designName: "sentences", viewName: "sent-view", transform: null, opts: { include_docs: true } },
    target: { designName: "sentences", viewName: "target", transform: null, opts: { include_docs: true } }
}

class CouchDao {

    constructor(nano, dbName) {
        console.debug("CouchDao constructor");
        this.nano = nano

    }

    view(req) {
        let that = this;
        const couchDb = that.nano.use(req.db);
        const params = req.params;
        const view = COUCHDB_VIEW_DICT[params.view]

        return new Promise(function (resolve, reject) {
            couchDb.view(view.designName, view.viewName, view.opts,
                function (err, result, header) {
                    if (err) {
                        console.error(err);
                        reject(
                            new DaoError(20, "CouchDao Internal server error db: " + couchDb.config.db, view.designName, view.viewName)
                        );
                    } else if (result === null || result.rows === null) {
                        reject(
                            new DaoError(21, "View might be empty", couchDb.config, view.designName, view.viewName)
                        );
                    } else {
                        if (view.transform) {
                            result = view.transform(couchDb, params, result, req)
                        }

                        resolve(result);
                    }
                })
        });
    }

    docs(req) {
        let that = this;
        const couchDb = that.nano.use(req.db);
        const params = req.params;
        return new Promise(function (resolve, reject) {
            couchDb.list({ include_docs: true }, function (err, result, header) {
                if (err) {
                    console.error(err);
                    reject(
                        new DaoError(20, "CouchDao Internal server error db: " + couchDb.config.db)
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



    find(req) {
        let that = this;
        const couchDb = that.nano.use(req.db);
        const query = req.body;
        return new Promise(function (resolve, reject) {

            couchDb.find(query, function (err, rows) {
                if (err) {
                    console.log(err)
                    reject(
                        new DaoError(20, "CouchDao Internal server error db: " + couchDb.config.db, query)
                    );
                } else if (rows === null || rows.length === 0) {
                    reject(
                        new DaoError(21, "Entity not found ", query)
                    );
                } else {
                    resolve(rows);
                }
            })
        });
    }



}

module.exports = CouchDao;
