const jwt = require('jsonwebtoken');
const { masterKey } = require('../../configuration');

function ensureAuthenticated(req, res, next) {
    try {
        // Intentar obtener el token desde Authorization header o las cookies
        const authHeader = req.headers.authorization;
        const token = authHeader?.startsWith("Bearer ") 
            ? authHeader.split(" ")[1] // Token desde el header Authorization: Bearer <token>
            : req.cookies.token; // Token desde las cookies

        if (!token) {
            return res.status(401).json({ message: 'No token provided. Unauthorized.' });
        }

        // Verificar el token
        const decoded = jwt.verify(token, masterKey);

        // Adjuntar datos del usuario al objeto req
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Error en ensureAuthenticated:', error.message);
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }
}

module.exports = { ensureAuthenticated };