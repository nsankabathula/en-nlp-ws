const Error = require("../core/error");
var PythonShell = require("python-shell");

module.exports = function (app, controller) {
    const defaultRoute = "/python/"


    app.post(defaultRoute +  ":pythonFileName/", (req, res) => {        
        controller.execute(req, res);
    }
    )

    app.post(defaultRoute + ":pythonFileName" + "/" + ":fileName/:tableName", (req, res) => {
        controller.run(req, res);
    }
    )
}