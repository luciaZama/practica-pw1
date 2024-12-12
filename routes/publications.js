const express = require('express');
const router = express.Router();


// GET all publications
router.get('/publications', async (req, res) => {
    res.send('Muestra las publicaciones');
});

// GET new publication
router.get('/publications/add', async (req, res) => {
    res.render('publications/new-publication');
});

// POST a new publication
router.post('/publications/new-publication', async (req, res) => {
    const publication = new Publication({
        author: req.body.author,
        title: req.body.title,
        text: req.body.text,
    });

    try {
        const newPublication = await publication.save();
        res.status(201).json(newPublication);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

