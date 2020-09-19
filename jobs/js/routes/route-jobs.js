'use strict';

// load the express module
var express = require('express');

// initliaze the router module
var router = express.Router();

var jwt = require('jsonwebtoken');
var config = require('config');

// get the jobs controller
var jobs_controller = require("../controllers/jobs-controller");

// get all the jobs
router.get("/", ensureAuthorized, jobs_controller.jobs_get);

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


function ensureAuthorized(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        jwt.verify(bearerToken, config.get("users.dbConfig.JWT_SECRET"), function (err, decoded) {
            if (err || !decoded) {
                console.log(err);
                return res.sendStatus(401)
            } else {
                console.log("Decoded: " + JSON.stringify(decoded));
                next();
            }
        })
    } else {
        res.status(403).send({errorMessage: "Access forbidden. Access to this resource is blocked. Please login to access."});
    }
}

// export the router
module.exports = router;


