const Error = require("../core/error");

module.exports = function (app, controller) {

    const defaultRoute = "/meta/"

    app.get(defaultRoute, (req, res) => {
        controller.findAll(req, res);
    });


}