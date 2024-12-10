const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// GET a user by their username
router.get('/', async (req, res) => {
    const username = req.params.username;
    try {
        const user = await User.findOne(username).exec();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})