/**
 * beilleszti a változókat a template-be
 */
 module.exports = function (objectrepository, viewName) {
    return function (req, res, next) {
        console.log('render: ' + viewName);
        res.render(viewName);
    };
};