const express = require('express');
const router = express.Router();
const studiesController = require('../controllers/studies');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

////////////////////
// GET requests
////////////////////
router.get('/', ensureAuth, studiesController.getDashboard);
router.get('/hackensack', ensureAuth, studiesController.getHackensackStudies);
router.get('/wayne', ensureAuth, studiesController.getWayneStudies);
router.get('/myStudies', ensureAuth, studiesController.getMyStudies);
router.get('/:id', ensureAuth, studiesController.getStudy);

///////////////////
// POST requests
///////////////////

// Add study
router.post('/addStudy', studiesController.addStudy);
// Search studies
router.post('/hackensack/search', studiesController.searchHackensackStudies);
router.post('/wayne/search', studiesController.searchWayneStudies);

////////////////////
// DELETE requests
////////////////////

// Delete studies
router.delete('/deleteStudy', studiesController.deleteStudy);

///////////////////
// PUT requests
///////////////////

// Tech Mark complete/incomlete
router.put('/markTechComplete', studiesController.markTechComplete);
router.put('/markTechIncomplete', studiesController.markTechIncomplete);
// Doctor Mark complete/incomplete
router.put('/markDoctorComplete', studiesController.markDoctorComplete);
router.put('/markDoctorIncomplete', studiesController.markDoctorIncomplete);

module.exports = router;