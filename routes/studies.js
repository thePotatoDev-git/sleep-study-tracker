const express = require('express');
const router = express.Router();
const studiesController = require('../controllers/studies');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

// GET requests
router.get('/', ensureAuth, studiesController.getDashboard);
router.get('/hackensack', ensureAuth, studiesController.getHackensackStudies);
router.get('/wayne', ensureAuth, studiesController.getWayneStudies);

// POST requests
router.post('/addStudy', studiesController.addStudy);

// DELETE requests
router.delete('/hackensack/deleteStudy', studiesController.deleteStudy);
router.delete('/wayne/deleteStudy', studiesController.deleteStudy);

// PUT requests
// router.put('/markComplete', studiesController.markComplete);
// router.put('/markIncomplete', studiesController.markIncomplete);

module.exports = router;