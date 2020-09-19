'use strict';
// load the required modules
const express = require("express");
const config = require("config");

// load the jobs router
const jobsRouter = require("./js/routes/route-jobs");

const usersRouter = require("./js/routes/route-users");

// initialising the express object
const app = express();

// use the express json and server the static resources
app.use(express.json());
app.use("/api/v1/jobs", jobsRouter);
app.use("/api/v1/auth", usersRouter);
app.use(express.static('public'));

// get the port from config
const port = config.get("server.port");
console.log("server port", port);

// all unmatched requests, redirect to home page.
app.all('*', (req, res) => {
    res.redirect("/");
});

app.listen(port, () => {
    console.log("server is up and running on port ", port);
});

module.exports = app;