const express = require('express');
const router = express.Router();
const editController = require('../controllers/edit');

// GET edit pages
router.get('/:id', editController.getEdit);


// POST edits
router.post('/:id', editController.editStudy);

// DELETE study
router.post('/deleteStudy/:id', editController.deleteStudy);
router.post('/deleteFromViewStudy/:id', editController.deleteFromViewStudy);

module.exports = router;