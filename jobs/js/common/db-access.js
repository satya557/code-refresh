'use strict';

/** TODO: Get or load the definition from the configuration */
var job_schema_definition = {
    jobCode: { type: Number, required: true, unique: true },
    jobTitle: { type: String, required: true, trim: true },
    jobStatus: { type: String, required: true, trim: true},
    jobLocation: { type: String, required: true, trim: true },
}

exports.getModelByName = function (dbName) {
    if (!dbName) {
        console.log("getModelByName - dbName is", dbName);
        return;
    }
    const mongoose = require('mongoose');
    const schema = new mongoose.Schema(job_schema_definition, { collection: dbName });
    const model = mongoose.model('Jobs', schema);
    const config = require("config");
    const url = getUrl(config, dbName);
    console.log("getModelByName - url is", url);
    mongoose.connect(url + dbName, { useNewUrlParser: true, useUnifiedTopology: true });
    return model;
}

function getUrl(config, dbName) {
    const host = config.get(dbName + "." + "dbConfig.host");
    console.log("getUrl - host is", host);
    const port = config.get(dbName + "." + "dbConfig.port");
    console.log("getUrl - port is", port);
    return "mongodb://" + host + ":" + port + "/";
}