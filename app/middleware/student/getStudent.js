/**
 * betölti az adatbázisból a :studentid paraméter szerinti student-et
 */
const getModel = require('../getModel');
 module.exports = function (objectrepository) {
     const studentModel = getModel(objectrepository, 'studentModel'); 
    return function (req, res, next) {
        studentModel.findOne({ _id: req.params.userid }, (err, student) => {
            if (err || !student) {
                return next(err);
            }

            res.locals.student = student;
            return next();
        });
    };
};