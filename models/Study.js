const mongoose = require('mongoose');

const studySchema = new mongoose.Schema({
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
    osaPositive: {
        type: Boolean,
        default: false,
        required: true,
    },
    inNetwork: {
        type: Boolean,
        default: false,
    },
    techFollowUp: {
        type: String,
        default: null,
    },
    doctorFollowUp: {
        type: String,
        default: null,
    },
    maskFitting: {
        type: String,
        default: null,
    },
    cpapOrder: {
        type: String,
        default: null,
    },
    cpapReceived: {
        type: String,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Study', studySchema, 'studies');