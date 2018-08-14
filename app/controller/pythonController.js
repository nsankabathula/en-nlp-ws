var PythonShell = require("python-shell");
const PYTHON_FILE_DIR = "c:/Users/nsankabathula/dev/jscript/sqllite-node/app/controller/";
const SQLLITE_DIR = "c:/Users/nsankabathula/dev/jscript/sqllite-node/app/data/";

class PythonController {

    constructor(contoller) {
        this.controller = contoller
    }

    run(req, res) {
        console.log(__dirname);
        var options = {
            args:
                [
                    req.params.fileName,
                    SQLLITE_DIR
                ]
        }

        PythonShell.run(PYTHON_FILE_DIR + req.params.pythonFileName, options, function (err, data) {
            console.log(data)
            if (err) res.send(err);
            res.send(data)
        });
    }
}

module.exports = PythonController;