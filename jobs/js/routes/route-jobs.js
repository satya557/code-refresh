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

// create one or more jobs
router.post("/", jobs_controller.jobs_create);

// delete one job
router.delete("/:id", jobs_controller.jobs_delete);

// delete one or more jobs
router.delete("/", jobs_controller.jobs_delete);

// update one job
router.put("/:id", jobs_controller.job_update);

// export the router
module.exports = router;