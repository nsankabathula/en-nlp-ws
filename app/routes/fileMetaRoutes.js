const Error = require("../core/error");

module.exports = function (app, controller) {

    const defaultRoute = "/meta/file/"

    app.get(defaultRoute, (req, res) => {
        controller.findAll(req, res);
    });

    app.get(defaultRoute + ':txtFileName', (req, res) => {
        controller.findOne(req, res);
    });

    app.post(defaultRoute + ":txtFileName" + "/" + ":useforTraining" + "/", (req, res) => {
        controller.update(req, res);
    });

}