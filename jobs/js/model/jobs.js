'use strict';

const config = require("config");
const dbName = config.get("jobs.dbConfig.dbName");
const model = require("../common/db-access").getModelByName(dbName);
const mongoose = require('mongoose');
const { jobs_create } = require("../controllers/jobs-controller");

// get all the jobs
exports.getJobs = function () {
    return new Promise((resolve, reject) => {
        model.find({}).exec()
            .then(function (result) {
                resolve(result);
            })
            .catch(function (err) {
                reject(err);
            })
    });
}

// get the job by id
exports.getJobById = function (id) {
    return new Promise((resolve, reject) => {
        var boolean = mongoose.Types.ObjectId.isValid(id);
        if (boolean) {
            model.find({ _id: id }).exec()
                .then(function (result) {
                    resolve(result);
                })
                .catch(function (err) {
                    reject(err);
                });
        } else {
            var invalidErrMsg = config.get("jobs.errorMessages.invalidObjectId");
            reject(invalidErrMsg);
        }
    });
}

// get the jobs by status
exports.getJobsByStatus = function (status) {
    return new Promise((resolve, reject) => {
        model.find({ "jobStatus": status }).exec()
            .then(function (result) {
                resolve(result);
            })
            .catch(function (err) {
                reject(err);
            });
    });
}

// create the new job
exports.createJobs = function (payload) {
    return new Promise((resolve, reject) => {
        model.insertMany(payload)
            .then(function (result) {
                resolve(result);
            })
            .catch(function (err) {
                reject(err);
            });
    });
}

// delete the selected jobs
exports.deleteJobs = function (objectIds) {
    var jobsTodelete = {
        _id: {
            $in: objectIds
        }
    };
    return new Promise((resolve, reject) => {
        model.deleteMany(jobsTodelete)
            .then(function (result) {
                resolve(result)
            })
            .catch(function (err) {
                reject(err);
            });
    });
}

// update the jobs
exports.updateJob = function (objectId, job) {
    return new Promise((resolve, reject) => {
        model.updateOne({ _id: objectId }, job)
            .then(function (result) {
                resolve(result);
            })
            .catch(function (err) {
                reject(err);
            });
    });
}
