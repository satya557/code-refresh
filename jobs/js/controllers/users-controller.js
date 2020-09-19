'use strict';

// load the jobs model
var usersModel = require("../model/users");
var jwt = require("jsonwebtoken");

var config = require("config");

exports.create_user = function (req, res) {
    var payload = req.body;
    usersModel.createUser(payload)
        .then(result => {
            res.json(
                {
                    username: result.username,
                    token: _getJWTToken(payload)
                });
        })
        .catch(err => {
            res.status(500).send(err);
        });
}

exports.get_user = function(req, res) {
    var payload = req.body;
    usersModel.getUser(payload)
        .then(result => {
            res.json(
                {
                    username: result.username,
                    token: _getJWTToken(payload)
                }
            );
        })
        .catch(err => {
            res.status(500).send(err);
        });
}

function _getJWTToken(payload) {
    return jwt.sign(payload, config.get("users.dbConfig.JWT_SECRET"), { expiresIn: '10m' });
}