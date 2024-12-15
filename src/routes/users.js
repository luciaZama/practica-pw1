const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { masterKey } = require('../../configuration');
const {ensureAuthenticated} = require('../middlewares/auth')

// GETS user login
router.get('/users/login', (req, res) => {
    res.render('users/login');
});

// POSTS user login
router.post('/users/login', async (req, res) => {
   try {
        const {email, password} = req.body;

        const user = await User.findOne({email}).lean();
        if (!user) {
            req.flash('error_msg', 'Usuario no encontrado');
            return res.redirect('/users/login');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            req.flash('error_msg', 'Contraseña incorrecta');
            return res.redirect('/users/login');
        }

        console.log('Valor de masterKey:', masterKey);
        if (!masterKey) {
            throw new Error('La clave secreta (masterKey) no está definida.');
        }

        const token = jwt.sign({id: user._id, email: user.email}, masterKey, {expiresIn: '1h'});

        res.cookie('token', token, { httpOnly: true });
        req.flash('success_msg', 'Inicio de sesión exitoso');
        res.redirect('/publications');
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    
    }
});

// GETS user registration
router.get('/users/register', (req, res) => {
    res.render('users/register');
});

// POSTS user registration
router.post('/users/register', async (req, res) => {
    try {
        const {name, surnames, email, password, confirm_password} = req.body;
        const errors = [];
        const info = [name, surnames, email];
        const infoEsp = ['Nombre', 'Apellidos', 'Email'];

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
                name, 
                surnames, 
                email, 
                password, 
                confirm_password
            });
        } else {

            const userEmail = await User.findOne({email: email}).lean();
            if (userEmail) {
                req.flash('error_msg', 'Este email ya se encuentra en uso');
                res.redirect('/users/register');
            } else {
                const newUser = new User({name, surnames, email, password});
                newUser.password = await newUser.encryptPassword(password);
                await newUser.save()
                req.flash('success_msg', 'Registrado con éxito');
                res.redirect('/users/login');
            }
        }
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
    
});

router.get('/users/logout', async (req, res) => {
    try {
        res.clearCookie('token');
        req.flash('success_msg', 'Has cerrado sesión correctamente');
        res.redirect('/'); 
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ message: 'Error al cerrar sesión' });
    }
});

module.exports = router;
