const mongoose = require('mongoose');

const wayneStudySchema = new mongoose.Schema({
    lab: {
        type: String,
        required: true,
    },
    patientLastName: {
        type: String,
        required: true,
    },
    patientFirstName: {
        type: String,
        required: true,
    },
    studyDate: {
        type: String,
        required: true,
    },
    studyAmount: {
        type: String,
        required: true,
    },
    techName: {
        type: String,
    },
    comment: {
        type: String,
        required: false,
    },
    techCompleted: {
        type: Boolean,
        required: true,
    },
    doctorCompleted: {
        type: Boolean,
        required: true,
    },
});

module.exports = mongoose.model('WayneStudy', wayneStudySchema, 'wayne');