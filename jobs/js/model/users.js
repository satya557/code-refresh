'use strict'

const config = require("config");
const conn = require("../db/db-connection");
const model = conn.model('users');

exports.createUser = function (payload) {
    return new Promise((resolve, reject) => {
        model.create(payload)
            .then(function (result) {
                resolve(result);
            })
            .catch(function (err) {
                reject(err);
            })
    });
}

exports.getUser = function (payload) {
    return new Promise((resolve, reject) => {
        model.findOne({ username: payload.username, password: payload.password }).exec()
            .then(function (result) {
                resolve(result);
            })
            .catch(function (err) {
                reject(err);
            });
    });
}
