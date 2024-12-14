const express = require('express');
const router = express.Router();

// GETS user login
router.get('/users/login', (req, res) => {
    res.render('users/login');
});

// GETS user registration
router.get('/users/register', (req, res) => {
    res.render('users/register');
});

// POSTS user registration
router.post('/users/register', async (req, res) => {
    try {
        const {username, name, surnames, email, password, confirm_password} = req.body;
        const errors = [];
        const info = [username, name, surnames, email];
        const infoEsp = ['Nombre de usuario', 'Nombre', 'Apellidos', 'Email'];

        for (let i = 0; i < info.length; i++) {
            if (info[i].length <= 0) {
                errors.push({text: 'Por favor, introduzca la información en el campo ' + infoEsp[i]});
            }
        }

        if (password != confirm_password) {
            errors.push({text: 'Las contraseñas no coinciden'});
        }

        if (password.length < 6) {
            errors.push({text: 'La contraseña ha de tener 6 caracteres mínimo'});
        }

        if (errors.length > 0) {
            res.render('users/register', {
                errors, 
                username, 
                name, 
                surnames, 
                email, 
                password, 
                confirm_password
            });
        } else {

        }
    } catch {
        console.error('An error occurred:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
    
});

module.exports = router;