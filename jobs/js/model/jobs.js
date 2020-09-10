'use strict';

const config = require("config");
const dbName = config.get("jobs.dbConfig.dbName");
const model = require("../common/db-access").getModelByName(dbName);
const mongoose = require('mongoose');

// get all the jobs
exports.getJobs = function (res) {
    model.find({}).exec()
        .then(function (result) {
            res.json(result);
        });    
}

// get the job by id
exports.getJobById = function (res, id) {
    var boolean = mongoose.Types.ObjectId.isValid(id);
    if(boolean) {
        model.find({_id: id}).exec()
        .then(function (result) {
            res.json(result);
        });
    } else {
        res.status(500).send("Invalid Id");
    }
}

// get the jobs by status
exports.getJobsByStatus = function (res, status) {
    model.find({ "jobStatus": status}).exec()
        .then(function (result) {
            res.json(result);
        });
}

// set or create new job
exports.setJob = function (res, status) {
    model.find({ "jobStatus": status }).exec()
        .then(function (result) {
            res.json(result);
        });
}
