const express = require('express');
const router = express.Router();
const editController = require('../controllers/edit');

// GET edit pages
router.get('/:id', editController.getEdit);


// POST edits
router.post('/:id', editController.editStudy);

module.exports = router;