/**
 * kitorol az adatbazisbol egy student egy kurzusat
 */
 module.exports = function () {
    return function (req, res, next) {
        var indexCourse = res.locals.student.courses.indexOf(res.locals.kurzus._id);
        var indexStudent = res.locals.kurzus.students.indexOf(res.locals.student._id);
    if (indexCourse !== -1) {
        res.locals.student.courses.splice(indexCourse, 1);
    }
    if (indexStudent !== -1) {
        res.locals.kurzus.students.splice(indexStudent, 1);
    }
         res.locals.student.save((err) => {
            if(err){
                throw new Error("nem leeht menteni a student-et!");
            }
            res.locals.kurzus.save((err) => {
                if(err){
                    throw new Error("nem leeht menteni a kurzust!");
                }
                return res.redirect('/student/' + res.locals.student._id + '/kurzusaim');
            });
        });   
    };
};