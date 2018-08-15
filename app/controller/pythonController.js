var PythonShell = require("python-shell");
const PYTHON_FILE_DIR = "/home/paperspace/dev/sqllite-node/app/controller/";
const SQLLITE_DIR = "/home/paperspace/dev/sqllite-node/app/data/";

PythonShell.defaultOptions = {
    //scriptPath: '/home/paperspace/dev/en-nlp/rcare/'
    scriptPath: '/home/paperspace/dev/en-nlp/rcare'
};

class PythonController {

    constructor(contoller) {
        this.controller = contoller
    }

    run(req, res) {
                var options = {
            args:
                [
                    req.params.fileName,
                    SQLLITE_DIR,                    
                ]
        }
        
        PythonShell.run(req.params.pythonFileName, options, function (err, data) {            
            data = (data)? data: {"empty" : true}
            console.log(data)
            if (err) res.send(err);
            try{
                res.send(data)
            }
            catch(ex){
                console.error(ex)
            }
            
        });
    }
}

module.exports = PythonController;