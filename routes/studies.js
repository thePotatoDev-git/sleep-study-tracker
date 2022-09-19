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
router.delete('/hackensack/deleteStudy', studiesController.deleteStudy);
router.delete('/wayne/deleteStudy', studiesController.deleteStudy);

///////////////////
// PUT requests
///////////////////

// Mark complete
router.put('/hackensack/markTechComplete', studiesController.markTechComplete);
router.put('/hackensack/markTechIncomplete', studiesController.markTechIncomplete);
router.put('/wayne/markTechComplete', studiesController.markTechComplete);
router.put('/wayne/markTechIncomplete', studiesController.markTechIncomplete);
// Mark incomplete
router.put('/hackensack/markDoctorComplete', studiesController.markDoctorComplete);
router.put('/hackensack/markDoctorIncomplete', studiesController.markDoctorIncomplete);
router.put('/wayne/markDoctorComplete', studiesController.markDoctorComplete);
router.put('/wayne/markDoctorIncomplete', studiesController.markDoctorIncomplete);

module.exports = router;