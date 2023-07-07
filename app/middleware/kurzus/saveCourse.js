/**
 * A POST-ban megadott adatokkal a res.locals-ban lévő változótól függően hozzáad az adatbázishoz egy új kurzust,
 * vagy egy meglévő kurzust módosít
 */
const getModel = require('../getModel');
module.exports = function (objectrepository) {
    return function (req, res, next) {
        const kurzusModel = getModel(objectrepository, 'courseModel');
        if(typeof req.body.name === 'undefined' ||
           typeof req.body.language === 'undefined' || 
           typeof req.body.level === 'undefined' ||
           typeof req.body.maxnumber === 'undefined'
        ){
            return next();
        }
        if (typeof res.locals.kurzus === 'undefined') {
            res.locals.kurzus = new kurzusModel();
        }
        res.locals.kurzus.name = req.body.name;
        res.locals.kurzus.language = req.body.language;
        res.locals.kurzus.level = req.body.level;
        res.locals.kurzus.maxnumber = req.body.maxnumber;
        


        if ( req.body.name === '' ||
         req.body.language === '' ||
         req.body.level === '' ||
         req.body.maxnumber === ''
        ) {
            res.locals.fieldError = 'Mindegyik mezőt töltse ki!';
            return next();
        }
        var mn = parseInt(req.body.maxnumber, 10);
        if(Number.isNaN(mn) || mn % 1 !== 0){
            res.locals.fieldError = 'A max létszámot egy egész számmal adja meg!';
            return next();
        }
        if(mn < 1 || mn>1000 ){
            res.locals.numError = '0 és 1000 között adja meg a létszámot!';
            return next();
        }
        res.locals.kurzus.maxnumber = parseInt(req.body.maxnumber, 10);
        res.locals.kurzus.save(err=>{
            if(err){
                return next(err);
            }
            return res.redirect('/admin/kurzusok');
        });
    };
};