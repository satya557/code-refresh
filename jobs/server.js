'use strict';
// load the express module
const express = require("express");

// load the config module
const config = require("config");

// initialising the express object
const app = express();

// get the port from config
const port = config.get("server.port");
console.log("server port", port);

// get the jobs router
const jobsRouter = require("./js/routes/route-jobs");

app.use('/api/v1/jobs', jobsRouter);

app.listen(port, () => {
    console.log("server is up and running on port ", port);
});

module.exports = app;