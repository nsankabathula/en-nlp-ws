const Error = require("../core/error");
const util = require('util');

module.exports = function (app, controller, routeName) {

    const defaultRoute = util.format("/%s/", (routeName) ? routeName : 'training');

    app.get(defaultRoute, (req, res) => {
        controller.findAllFiles(req, res);
    });

    app.get(defaultRoute + ':fileName', (req, res) => {
        controller.findByFileName(req, res);
    });

    app.get(defaultRoute + ':fileName' + "/" + "compare", (req, res) => {
        controller.compare(req, res);
    });

    app.get(defaultRoute + ':fileName' + "/" + ":lineId", (req, res) => {
        controller.findByLineId(req, res);

    });

    app.post(defaultRoute + ":fileName" + "/", (req, res) => {
        controller.merge(req, res);
    });

    app.post(defaultRoute + ":fileName" + "/" + ":lineId" + "/" + ":target", (req, res) => {
        controller.update(req, res);
    });

    app.delete(defaultRoute + ":fileName", (req, res) => {
        controller.delete(req, res);
    });

};