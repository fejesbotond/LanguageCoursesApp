/**
 * megnezi, hogy a felhasznalo adminkent van-e bejelentkezve,
 * ha igen next-et hív,
 * ha nem /-hez vissza
 */
module.exports = function(objectrepository){
    return function (req, res, next) {
        if(typeof req.session.userid === 'undefined'){
            return res.redirect('/');
        }
        if(req.session.userid !== 'admin'){
           return  res.redirect('/student/'+ req.session.userid + '/kurzusaim');
        }
        return next();
    };
};