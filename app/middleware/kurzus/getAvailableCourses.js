/**
 * Betölti az adatbázisból azokat a kurzusokat, amik nincsennek betelve es amiket az adott user még nem vett fel
 */
const getModel = require('../getModel');
module.exports = function(objectrepository){
    const courseModel = getModel(objectrepository, 'courseModel');
    return function(req, res, next){
        if(typeof res.locals.student ==='undefined'){
            return next();
        }
        courseModel.find({$and: [{students: {$ne: res.locals.student._id}}, {$where: "this.students.length < this.maxnumber"}]}, (err, courses)=>{
            if(err){
                return next(err);
            }
            res.locals.availableCourses = courses;
            console.log(res.locals.availableCourses);
            return next();
        });
    };
};