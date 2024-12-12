const express = require('express');
const router = express.Router();
const Publication = require('../models/Publication');



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
            res.send('ok');
          }
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;

