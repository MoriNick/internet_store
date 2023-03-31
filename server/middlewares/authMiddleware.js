const jwt = require('jsonwebtoken');

function checkRole(roles, role) {
    let check = true;
    roles.map(elem => {
        if (elem === role)
            check = false;
    })
    return check;
}

module.exports = function(req, res, next) {
    if (req.method === "OPTIONS")
        next();

    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token)
            return res.status(401).json({message: 'Пользователь не авторизован!'});
        
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        if (req.checkRoles && checkRole(req.checkRoles, decoded.role))
            return res.status(403).json({message: 'Нед доступа!'});

        req.user = decoded;//закидываем информацию о пользователе в запрос
        next();

    } catch (e) {
        res.status(401).json({message: 'Пользователь не авторизован!'})
    }
}