const express = require('express');
const router = express.Router();
const Publication = require('../models/Publication');

// GET all publications
router.get('/', async (req, res) => {
    try {
        const publications = await Publication.find();
        res.status(200).json(publications);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// GET publication by title
router.get('/', async (req, res) => {
    const titleWanted = req.params.title; 
    try {
        const publication = await Publication.findOne({title: titleWanted}).exec();
        res.status(200).json(publication);
    } catch {
        res.status(500).json({message: err.message});
    }
});

// GET publication by author
