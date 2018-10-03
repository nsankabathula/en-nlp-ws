const express = require('express');
const filesConfig = require('./files.json');



module.exports = {
    files: express.static(filesConfig[0]["files"])
};