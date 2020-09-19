const { Schema } = require("mongoose");

const user_schema_definition = {
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true }
};

const user_schema = new Schema(user_schema_definition);

module.exports = user_schema;