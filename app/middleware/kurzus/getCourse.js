/**
 * Betölt egy kurzust az adatbázisból :kurzusid szerint
 */
const getModel = require('../getModel');
module.exports = function(objectrepository){
    const courseModel = getModel(objectrepository, 'courseModel');
    return function (req, res, next) {
        courseModel.findOne({ _id: req.params.courseid }, (err, course) => {
            if (err || !course) {
                return next(err);
            }

            res.locals.kurzus = course;
            return next();
        });
    };
};