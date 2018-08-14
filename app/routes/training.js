const Error = require("../core/error");

module.exports = function (app, controller) {

    const defaultRoute = "/training/"

    app.get(defaultRoute, (req, res) => {
        controller.findAllFiles(req, res);
    });

    app.get(defaultRoute + ':fileName', (req, res) => {
        controller.findByFileName(req, res);
    });

    app.get(defaultRoute + ':fileName' + "/" + ":lineId", (req, res) => {
        controller.findByLineId(req, res);

    });

    app.post(defaultRoute + ":fileName" + "/" + ":lineId" + "/" + ":target", (req, res) => {
        controller.update(req, res);
    });


    app.delete(defaultRoute + ":fileName", (req, res) => {
        controller.delete(req, res);
    });

};