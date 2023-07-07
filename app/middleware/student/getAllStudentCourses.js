/**
 * Betölti az adatbazisbol az adott student összes felvett kurzusat
 */
 module.exports = function (objectrepository) {
    return function (req, res, next) {
        if(typeof res.locals.student === 'undefined'){
            return next();
        }
        res.locals.student.populate('courses', function(){
            res.locals.kurzusok = res.locals.student.courses;
            return next();
        });
    };
};