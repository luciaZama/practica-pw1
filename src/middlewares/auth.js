const jwt = require('jsonwebtoken');
const { masterKey } = require('../../configuration');

function ensureAuthenticated(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.startsWith("Bearer ") 
            ? authHeader.split(" ")[1] 
            : req.cookies.token; 
        if (!token) {
            req.flash('error_msg', 'No Autorizado');
            return res.redirect('/users/login');
        }
        
        const decoded = jwt.verify(token, masterKey);

        req.user = decoded;
        res.locals.user = decoded;
        
        next();
    } catch (error) {
        console.error('Error en ensureAuthenticated:', error.message);
        return res.redirect('/users/login');
    }
}

module.exports = { ensureAuthenticated };