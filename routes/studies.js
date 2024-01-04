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

// Mark in/out network
router.put('/markInNetwork', studiesController.markInNetwork);
router.put('/markOutNetwork', studiesController.markOutNetwork);

// Tech Mark complete/incomlete
router.put('/markTechComplete', studiesController.markTechComplete);
router.put('/markTechIncomplete', studiesController.markTechIncomplete);

// Doctor Mark complete/incomplete
router.put('/markDoctorComplete', studiesController.markDoctorComplete);
router.put('/markDoctorIncomplete', studiesController.markDoctorIncomplete);

// Mark osa positive/negative
router.put('/markOSAPositive', studiesController.markOSAPositive);
router.put('/markOSANegative', studiesController.markOSANegative);

// Update current date
router.put('/updateMaskFittingDate', studiesController.updateMaskFittingDate);
router.put('/updateCPAPOrderDate', studiesController.updateCPAPOrderDate);
router.put('/updateTechFollowUpDate', studiesController.updateTechFollowUpDate);
router.put('/updateDoctorFollowUpDate', studiesController.updateDoctorFollowUpDate);
router.put('/updateCPAPReceivedDate', studiesController.updateCPAPReceivedDate);

// Clear current date
router.put('/clearMaskFittingDate', studiesController.clearMaskFittingDate);
router.put('/clearCPAPOrderDate', studiesController.clearCPAPOrderDate);
router.put('/clearTechFollowUpDate', studiesController.clearTechFollowUpDate);
router.put('/clearDoctorFollowUpDate', studiesController.clearDoctorFollowUpDate);
router.put('/clearCPAPReceivedDate', studiesController.clearCPAPReceivedDate);

module.exports = router;