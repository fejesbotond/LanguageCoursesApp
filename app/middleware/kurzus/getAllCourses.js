/**
 * Betölti az összes kurzust az adatbázisból
 */
const getModel = require('../getModel');
module.exports = function(objectrepository){
    const kurzusModel = getModel(objectrepository, 'courseModel');
    return function(req, res, next){
        kurzusModel.find({}, (err, courses)=>{
            if(err){
                return next(err);
            }
            res.locals.kurzusok = courses;
            return next();
        });    
    };
};