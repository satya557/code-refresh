
'use strict';

// load the jobs model
var jobsdb = require("../model/jobs");

exports.jobs_get = function(req, res) {
    var query = req.query;
    var status = query.status;
    status ? jobsdb.getJobsByStatus(res, status) : jobsdb.getJobs(res);
}

exports.job_get = function(req, res) {
    var params = req.params;
    var id = params.id;
    jobsdb.getJobById(res, id);
}
