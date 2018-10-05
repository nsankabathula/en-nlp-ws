const express = require('express');
const env = require("../evnironment/environment");


module.exports = {
    files: express.static(env.files.uri)
};