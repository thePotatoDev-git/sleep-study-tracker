const express = require('express');
const router = express.Router();
const studiesController = require('../controllers/studies');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

router.get('/', ensureAuth, studiesController.getDashboard);
router.get('/hackensack', ensureAuth, studiesController.getHackensackStudies);
router.get('/wayne', ensureAuth, studiesController.getWayneStudies);

module.exports = router;