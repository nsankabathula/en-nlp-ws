const Helper = require('./helper')

const environment = {
    production: false,
    configs: Helper.configs,
    traningdb: Helper.config("trainingdb"),
    files: Helper.config("files"),
    paperspace: Helper.config("paperspace"),
    couchdb: Helper.config("couchdb"),
    discover: Helper.config("discover")
};

module.exports = environment

