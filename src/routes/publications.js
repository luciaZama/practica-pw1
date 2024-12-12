const express = require('express');
const router = express.Router();
const Publication = require('../models/Publication');



// GET all publications
router.get('/publications', async (req, res) => {
    const allPublications = await Publication.find().lean().sort({date: 'desc'});
    res.render('publications/all-publications', {allPublications});
});

// GET new publication
router.get('/publications/add', async (req, res) => {
    res.render('publications/new-publication');
});

// POST a new publication
router.post('/publications/new-publication', async (req, res) => {
    try {
        const { title, content } = req.body;
        const errors = [];

        if (!title) {
            errors.push({ text: 'Porfavor escribe un título' });
        } 

        if (!content) {
            errors.push({ text: 'Porfavor escribe los contenidos de la publicación'});
        }

        if (errors.length > 0) {
            res.render('publications/new-publication', {
              errors,
              title,
              content
            });
          } else {
            const newPublication = new Publication({title, content});
            await newPublication.save();
            res.redirect('/publications');
          }
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// EDITS a publication
router.get('/publications/edit/:id', async (req, res) => {
    const publication = await Publication.findById(req.params.id);
    res.render('publications/edit-publication', {publication});
});

module.exports = router;

