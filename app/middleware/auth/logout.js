module.exports = function() {
    return function(req, res) {
        req.session.destroy(err => {
            if(err){
                console.log("session destroy error!");
            }
           return res.redirect('/');
        });
    };
};