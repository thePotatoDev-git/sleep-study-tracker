const express = require('express');
const router = express.Router();
const editController = require('../controllers/edit');

// GET edit pages
router.get('/hackensack/:id', editController.getHackensackEdit);
router.get('/wayne/:id', editController.getWayneEdit);

// POST edits
router.post('/hackensack/:id', editController.editHackensackStudy);
router.post('/wayne/:id', editController.editWayneStudy);

module.exports = router;