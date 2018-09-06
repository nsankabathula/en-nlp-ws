var PythonShell = require("python-shell");
const PYTHON_FILE_DIR = "/home/paperspace/dev/sqllite-node/app/controller/";
const SQLLITE_DIR = "/home/paperspace/dev/sqllite-node/app/data/";

PythonShell.defaultOptions = {    
    scriptPath: '/home/paperspace/dev/en-nlp/rcare'
    //scriptPath: 'C:\\Users\\nsankabathula\\dev\\jscript\\sqllite-node\\app\\controller\\'
};

class PythonController {

    constructor(dao, contoller) {
        this.dao = dao;
        this.controller = contoller
    }

    run(req, res) {
        var that = this;
        that.dao.findOne(req.params.fileName)
            .then(that.tryExecutingPython(req.params.pythonFileName,req.params.tableName, res))
            .catch(that.controller.findError(res));
    }
    
    execute(req, res){
        var that = this;
        console.log("execute", req.body)
        var pythonConfig = req.body;
        that.executePython(req.params.pythonFileName, pythonConfig.args, res)
        
        
    }

    tryExecutingPython(pythonFileName, tableName, res, result) {
        //console.log(result)
        return (result) => {
            var options = {
                args:
                    [
                        result.txtFileName,
                        result.fileLocation,
                        SQLLITE_DIR,
                        (tableName)? tableName : "predicted_data"
                    ]
            }
            //console.log(options);
            PythonShell.run(pythonFileName, options, function (err, data) {
                data = (data) ? data : { "empty": true }
                console.log("python result", data)
                if (err) {
                    console.error(err);
                    res.status(500);
                    //res.json(err);
                }
                try {
                    res.status(200); // Found
                    res.json(data)
                }
                catch (ex) {
                    res.status(500);
                    res.json(ex);
                }

            });

        }
    }
    
    executePython(pythonFileName, pythonArgs, res) {
        //console.log(result)        
            var options = {               
                args:
                    [].concat(pythonArgs)
            }
            //console.log(options);
            PythonShell.run(pythonFileName, options, function (err, data) {
                data = (data) ? data : { "empty": true }
                console.log("python result", data)
                const result = {
                    "data": data
                }
                if (err) {
                    console.error("executePython error", err);
                    res.status(500);
                    //res.json(err);
                }
                try {
                    res.status(200); // Found
                    res.json(result)
                }
                catch (ex) {
                    res.status(500);
                    res.json(ex);
                }

            });

    }
}

module.exports = PythonController;