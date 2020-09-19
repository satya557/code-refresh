const { Schema } = require("mongoose");

const job_schema_definition = {
    jobCode: { type: Number, required: true, unique: true },
    jobTitle: { type: String, required: true, trim: true },
    jobStatus: { type: String, required: true, trim: true},
    jobLocation: { type: String, required: true, trim: true },
    jobDescription: { type: String, required: true, trim: true },
}

const job_schema = new Schema(job_schema_definition);

module.exports = job_schema;