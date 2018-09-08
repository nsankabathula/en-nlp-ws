const Error = require("../core/error");

module.exports = function (app, controller) {

    const defaultRoute = "/discover/"

    app.get(defaultRoute, (req, res) => {
        controller.get(req, res);
    });
}