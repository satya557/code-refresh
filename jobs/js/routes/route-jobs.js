'use strict';

// load the express module
var express = require('express');

// initliaze the router module
var router = express.Router();

// get the jobs controller
var jobs_controller = require("../controllers/jobs-controller");

// get all the jobs
router.get("/", jobs_controller.jobs_get);

// get only one job
router.get("/:id", jobs_controller.job_get);

// export the router
module.exports = router;