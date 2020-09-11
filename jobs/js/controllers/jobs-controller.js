
'use strict';

// load the jobs model
var jobsModel = require("../model/jobs");

exports.jobs_get = function (req, res) {
    var query = req.query;
    var status = query.status;
    if (status) {
        jobsModel.getJobsByStatus(status)
            .then((data) => {
                res.json(data);
            })
            .catch(function (err) {
                res.status(500).send(err);
            });
    } else {
        jobsModel.getJobs()
            .then((data) => {
                res.json(data);
            })
            .catch(function (err) {
                res.status(500).send(err);
            });
    }
}

exports.job_get = function (req, res) {
    var params = req.params;
    var id = params.id;
    jobsModel.getJobById(id)
        .then((data) => {
            res.json(data);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
}

exports.jobs_create = function (req, res) {
    var payload = req.body;
    jobsModel.createJobs(payload)
        .then((data) => {
            res.json(data);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
}

exports.jobs_delete = function (req, res) {
    var query = req.query;
    var mode = query.mode;
    var objectIds = [];
    if (mode && "bulk_mode" == mode) {
        objectIds = req.body;
    } else {
        objectIds.push(req.params.id);
    }
    jobsModel.deleteJobs(objectIds)
        .then((data) => {
            res.json(data);
        })
        .catch(function (err) {
            res.status(500).send(err);
        })
}

exports.job_update = function (req, res) {
    var id = req.params.id;
    var payload = req.body;
    jobsModel.updateJob(id, payload)
        .then((data) => {
            res.json(data);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
}
