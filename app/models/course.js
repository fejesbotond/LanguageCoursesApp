const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Course = db.model('Course', {
    name: String,
    language: String,
    level: String,
    maxnumber: Number,
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Student'
        }
    ]
});

module.exports = Course;