/**
 * hozzáad egy studenthez kurzust kurzushoz studentet
 */
 module.exports = function () {
    return function (req, res, next) {
        res.locals.student.courses.push(res.locals.kurzus._id);
        res.locals.kurzus.students.push(res.locals.student._id);
        res.locals.student.save((err) => {
            if(err){
                throw new Error("nem leeht menteni a student-et!");
            }
            res.locals.kurzus.save((err) => {
                if(err){
                    throw new Error("nem leeht menteni a kurzust!");
                }
                return res.redirect('/student/' + res.locals.student._id + '/availableCourses');
            });
        });
        
    };
};