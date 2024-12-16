const express = require('express');
const router = express.Router();
const Publication = require('../models/Publication');
const { ensureAuthenticated } = require('../middlewares/auth');

// GET all publications
router.get('/publications', ensureAuthenticated, async (req, res) => {
    const allPublications = await Publication.find({userId: req.user.id}).lean().sort({date: 'desc'});
    res.render('publications/all-publications', {allPublications});
});

// GET new publication
router.get('/publications/add', ensureAuthenticated, async (req, res) => {
    res.render('publications/new-publication');
});

// POST a new publication
router.post('/publications/new-publication', ensureAuthenticated, async (req, res) => {
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
            const newPublication = new Publication({title, content, userId: req.user.id});
            await newPublication.save();
            req.flash('success_msg', 'Publicación realizada con éxito');
            res.redirect('/publications');
          }
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// EDITS a publication
router.get('/publications/edit/:id', ensureAuthenticated, async (req, res) => {
    const publication = await Publication.findOne({_id: req.params.id, userId: req.user.id}).lean();
    res.render('publications/edit-publication', {publication});
});

// UPDATES a publication
router.put('/publications/edit-publication/:id', ensureAuthenticated, async (req, res) => {
    const {title, content} = req.body;
    await Publication.findOneAndUpdate({_id: req.params.id, userId: req.user.id}, {title, content}).lean();
    req.flash('success_msg', 'Publicación editada con éxito');
    res.redirect('/publications');
});

// DELETES a publication
router.delete('/publications/delete/:id', ensureAuthenticated, async (req, res) => {
    await Publication.findOneAndDelete({_id: req.params.id, userId: req.user.id}).lean();
    res.redirect('/publications');
});

module.exports = router;

