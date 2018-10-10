const express = require('express');
const env = require("../../environment/environment");


module.exports = {
    files: express.static(env.files.uri)
};