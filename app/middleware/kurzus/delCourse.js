/**
 * kitörli az adatbázisból a res.locals-ban lévő kurzust
 * a student-ek felvett kurzusai közül is törlődik ez a kurzus
 * törlés után /admin/kurzusok-hoz irányít
 */
module.exports = function(objectrepository){
    return function (req, res, next) {
        if(typeof res.locals.kurzus === 'undefined'){
            return next();
        }
        res.locals.kurzus.remove((err) => {
            if(err){
                return next(err);
            }
            return res.redirect('/admin/kurzusok');
        });
    };

};
