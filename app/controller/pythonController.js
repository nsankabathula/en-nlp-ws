var PythonShell = require("python-shell");
const PYTHON_FILE_DIR = "/home/paperspace/dev/sqllite-node/app/controller/";
const SQLLITE_DIR = "/home/paperspace/dev/sqllite-node/app/data/";

PythonShell.defaultOptions = {
    //scriptPath: '/home/paperspace/dev/en-nlp/rcare'
    scriptPath: 'C:\\Users\\nsankabathula\\dev\\jscript\\sqllite-node\\app\\controller\\'
};

class PythonController {

    constructor(dao, contoller) {
        this.dao = dao;
        this.controller = contoller
    }

    run(req, res) {
        var that = this;
        that.dao.findOne(req.params.fileName)
            .then(that.tryExecutingPython(req.params.pythonFileName, res))
            .catch(that.controller.findError(res));
    }

    tryExecutingPython(pythonFileName, res, result) {
        console.log(result)
        return (result) => {
            var options = {
                args:
                    [
                        result.txtFileName,
                        result.fileLocation,
                        SQLLITE_DIR,
                    ]
            }

            PythonShell.run(pythonFileName, options, function (err, data) {
                data = (data) ? data : { "empty": true }
                console.log("python result", data)
                if (err) this.controller.serverError(res);
                try {
                    res.status(200); // Found
                    res.json(data)
                }
                catch (ex) {
                    this.controller.serverError(res)
                }

            });

        }
    }
}

module.exports = PythonController;