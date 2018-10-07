const Error = require("../core/error");
const util = require('util');

module.exports = function (app, controller, routeName) {

    const defaultRoute = util.format("/couchdb.v1/%s/", routeName);


    app.get(defaultRoute, (req, res) => {
        controller.all(req, res);
    });





};