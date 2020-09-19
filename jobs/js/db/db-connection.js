'use strict';
const config = require("config");
const mongoose = require('mongoose');
const conn = mongoose.createConnection(getUrl(config) + getOrUseMongoDB(), { useNewUrlParser: true, useUnifiedTopology: true });
conn.model('jobs', require('./schema/jobs-schema'));
conn.model('users', require('./schema/users-schema'));

function getUrl(config) {
    const host = config.get("jobs.dbConfig.host");
    console.log("getUrl - host is", host);
    const port = config.get("jobs.dbConfig.port");
    console.log("getUrl - port is", port);
    return "mongodb://" + host + ":" + port + "/";
}

function getOrUseMongoDB() {
    return "myapp";
}

module.exports = conn;

