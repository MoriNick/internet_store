const authMiddleware = require('./authMiddleware');

module.exports = function(roles) {
    return function(req, res, next) {
        req.checkRoles = roles;
        authMiddleware(req, res, next);
    }
}