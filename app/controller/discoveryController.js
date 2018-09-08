
const SERVER = "http://localhost:8000/meta/file/1/"
var request = require('request');

class DiscoveryController {

    constructor(contoller) {
        console.log("DiscoveryController")
        this.controller = contoller
    }

    get(req, res) {
        console.log(SERVER);
        // Execute the HTTP Request
        request(SERVER, loaded);

        // Callback for when the request is complete
        function loaded(error, response, body) {
            // Check for errors
            if (!error && response.statusCode == 200) {
                // The raw HTML is in body
                res.send(body);
            } else {
                res.send(response);
            }
        }

    }

}

module.exports = DiscoveryController;