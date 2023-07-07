const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Student = db.model('Student', {
    username: String,
    password: String,
    extraInfo: String,
    courses: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Course'
        }
    ]
});

module.exports = Student;