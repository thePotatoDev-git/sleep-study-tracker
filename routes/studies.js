const express = require('express');
const router = express.Router();
const studiesController = require('../controllers/studies');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

////////////////////
// GET requests
////////////////////
router.get('/', ensureAuth, studiesController.getDashboard);
router.get('/hackensack', ensureAuth, studiesController.getHackensackStudies);
router.get('/hackensack-cpap', ensureAuth, studiesController.getHackensackCPAP);
router.get('/wayne', ensureAuth, studiesController.getWayneStudies);
router.get('/myStudies', ensureAuth, studiesController.getMyStudies);
router.get('/:id', ensureAuth, studiesController.getStudy);

///////////////////
// POST requests
///////////////////

// Add study
router.post('/addStudy', studiesController.addStudy);
// Search studies
router.post('/search', studiesController.searchStudies);
router.post('/hackensack/search', studiesController.searchHackensackStudies);
router.post('/hackensack-cpap/search', studiesController.searchHackensackStudies);
router.post('/wayne/search', studiesController.searchWayneStudies);

////////////////////
// DELETE requests
////////////////////

// Delete studies
// router.post("/deleteStudy/:id", studiesController.deleteStudy);

///////////////////
// PUT requests
///////////////////

// Tech Mark complete/incomlete
router.put('/markTechComplete', studiesController.markTechComplete);
router.put('/markTechIncomplete', studiesController.markTechIncomplete);

// Doctor Mark complete/incomplete
router.put('/markDoctorComplete', studiesController.markDoctorComplete);
router.put('/markDoctorIncomplete', studiesController.markDoctorIncomplete);

// Mark osa positive/negative
router.put('/markOSAPositive', studiesController.markOSAPositive);
router.put('/markOSANegative', studiesController.markOSANegative);

module.exports = router;