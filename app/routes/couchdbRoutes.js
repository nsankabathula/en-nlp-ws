const Error = require("../core/error");
const util = require('util');

module.exports = function (app, controller) {

    const defaultRoute = util.format("/couchdb.v1/:db/");


    app.get(defaultRoute + "docs/", (req, res) => {
        controller.docs(req, res);
    });

    app.post(defaultRoute + "find/", (req, res) => {
        controller.find(req, res);
    });

    app.get(defaultRoute + ":view/", (req, res) => {
        controller.view(req, res);
    });









};