/**
 * ellenorzi, hogy a POST-ban megadott felhasznalonev egyedi-e az adatbazisban,
 * ha igen letrehoz egy új student-et
 */
const getModel = require('../getModel');
module.exports = function (objectrepository) {
    const studentModel = getModel(objectrepository, 'studentModel');
    
    return  function (req, res, next) {

        if (typeof req.body.usr === 'undefined' ||
            typeof req.body.pass === 'undefined' ||
            typeof req.body.passAgain === 'undefined' ||
            typeof req.body.extra === 'undefined'
        ) {
            return next();
        }
        res.locals.student = new studentModel();
        res.locals.student.username = req.body.usr;
        res.locals.student.password = req.body.pass;
        res.locals.student.extraInfo = req.body.extra;
        res.locals.passAgain = req.body.passAgain;

        if ( req.body.usr === '' ||
         req.body.pass === '' ||
         req.body.passAgain === '' ||
         req.body.extra === ''
        ) {
            res.locals.fieldError = 'Mindegyik mezőt töltse ki!';
            return next();
        }
        if(req.body.pass !== req.body.passAgain){
            res.locals.passError = 'Nem egyezik a jelszo!';
            return next();
        }
        studentModel.findOne({username: req.body.usr}, (err, student) =>{
            if(err){
                return next(err);
            }
            if(student || req.body.usr === 'admin'){
                res.locals.usrError = 'A felhasználónév foglalt!';
                return next();
            }
            res.locals.student.save(err => {
                if (err) {
                    return next(err);
                }
                res.locals.sikeresReg = true;
                return next(); 
            });
        });
    };
};
