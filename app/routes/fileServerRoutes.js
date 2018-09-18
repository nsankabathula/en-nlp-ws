const Error = require("../core/error");
const FS = require('fs');
const DEFAULT_PATH = "C:\\elasticsearch-6.1.2\\"
const url = require('url');

module.exports = function (app) {

    const defaultRoute = "/files/"

    app.get(defaultRoute + "txt", (req, res) => {
        var query = url.parse(req.url, true).query;
        console.log(query);
        const filePath = DEFAULT_PATH + ((query) ? query.file : "NOTICE.txt"); //"app/data/discover.json"
        console.log(filePath);
        FS.readFile(filePath, function (err, content) {
            if (err) {
                res.writeHead(400)
                console.log(err);
                res.end(new Error(400, "No such file : " + filePath + "\n " + err));

            } else {
                //specify Content will be an attachment
                res.setHeader('Content-Type', 'text/plain'); //Tell the client you are sending plain text
                res.setHeader('Content-disposition', 'attachment; filename' + query.file);
                res.end(content);
            }
        })
    });

}