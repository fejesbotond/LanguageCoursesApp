/**
 * megnezi, hogy a felhasznalo egy adott student-ként van-e bejelentkezve (session :userid-ját hasonlítja a paraméterben megadott :userid-val),
 * ha igen next-et hív,
 * ha nem /-hez vissza
 */
 module.exports = function(objectrepository){
    return function (req, res, next) {
        if(typeof req.session.userid === 'undefined'){
            return res.redirect('/');
        }
        if(req.session.userid !== req.originalUrl.split('/')[2]){
            if(req.session.userid === 'admin'){
               return res.redirect('/admin/kurzusok');
                
            }
           return  res.redirect('/student/'+ req.session.userid + '/kurzusaim');
            
        }
       return next();
    };
};
