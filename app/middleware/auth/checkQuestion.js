/**
 * megnezi hogy a feltett kerdesre adott valasz egyezik-e regisztracional megadott valasszal,
 * ha igen
 * kiirja a console-ra a jelszot es felhasznalonevet, 
 */
const getModel = require('../getModel');
 module.exports = function (objectrepository) {
    const studentModel = getModel(objectrepository, 'studentModel');

    return function (req, res, next) {
        if(typeof req.body.extraInfo === 'undefined' || typeof req.body.username === 'undefined'){
            return next();
        }
        studentModel.findOne({username: req.body.username}, (err, student) => {
            if(err){
                return next(err);
            }
            if(!student || student.extraInfo !== req.body.extraInfo){
                res.locals.err = 'Nincs ilyen felhasználó, vagy hibás a jelszó!';
                return next();
            }
            res.locals.username = student.username;
            res.locals.pass = student.password;
            return next();
        });
    };
};