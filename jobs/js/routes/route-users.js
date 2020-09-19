'use strict';

// load the express module
var express = require('express');

// initliaze the router module
var router = express.Router();

// get the users controller
var users_controller = require("../controllers/users-controller");

// create the user
router.post("/", users_controller.create_user);

// get the user
router.post("/signin", users_controller.get_user);

// export the router
module.exports = router;