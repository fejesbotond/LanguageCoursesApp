/**
 * megnezi, hogy a post-ban küldött felhasznalonev-jelszo paros egyezik-e az adminhoz tartozó felh-jelsz párossal,
 * ha igen csinal egy session-t az adminnak és /admin/kurzusok-hoz irányít,
 * ha nem megnezi, hogy a post-ban küldött felhasznalonev-jelszo paros benne van-e
 * az adatbazisban levo student-ek között, ha igen csinál egy session-t a student-nek és /student/:studentid/kurzusaim-hoz irányít
 */
const getModel = require('../getModel');
module.exports = function (objectrepository) {

    const studentModel = getModel(objectrepository, 'studentModel');
    return function (req, res, next) {
        console.log(req.originalUrl);
        if(typeof req.body.username === 'undefined' || typeof req.body.password === 'undefined'){
            return next();
        }
        if(req.body.username === 'admin' && req.body.password === 'admin'){
            req.session.userid = 'admin';
            return res.redirect('/admin/kurzusok');
        }
        studentModel.findOne({username: req.body.username}, (err, student) =>{
            if(err){
                return next(err);
            }
            if(!student || req.body.password !== student.password){
                res.locals.errUser = 'Hibás felhasználónév vagy jelszó!';
                return next();
            }
            req.session.userid = student._id;
           return res.redirect('/student/'+ req.session.userid + '/kurzusaim');
        });
    };
};