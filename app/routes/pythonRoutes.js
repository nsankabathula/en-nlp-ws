const Error = require("../core/error");
var PythonShell = require("python-shell");

module.exports = function (app, controller) {
    const defaultRoute = "/python/"

    app.get(defaultRoute + ":pythonFileName" + "/" + ":fileName", (req, res) => {
        controller.run(req, res);
    }
    )
}