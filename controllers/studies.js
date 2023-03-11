const Study = require('../models/Study');
const User = require('../models/User');

module.exports = {
    getDashboard: async (req, res) => { // For /dashboard page
        try {
            let studies = await Study.find({techName: req.user.firstName, techCompleted: false}).sort({studyDate: -1}); // Goes to "Study" model DB and finds entries including user's name and incomplete by user
            let techs = await User.find({specialAccess: true}); // Goes to "User" model DB and finds users with the specialAccess property

            if (req.user.specialAccess === true) { // If user has specialAccess, render /dashboard. Else render /noaccess page.
                res.render('dashboard.ejs', { user: req.user, userStudies: studies, techs: techs }); // All variables in {...} are for referencing in ejs files
            } else {
                res.render('noaccess.ejs', { user: req.user });
            }
        } catch (err) {
            console.error(err);
        }
    },
    getMyStudies: async (req, res) => {
        try {
            let studies = await Study.find({techName: req.user.firstName}).sort({techCompleted: 1, doctorCompleted: 1, studyDate: -1})
            let techs = await User.find({specialAccess: true});
            if (req.user.specialAccess === true) {
                res.render('mystudies.ejs', { user: req.user, userStudies: studies, search: '', techs: techs });
            } else {
                res.render('noaccess.ejs', { user: req.user });
            }
        } catch (err) {
            console.error(err);
        }
    },
    getHackensackStudies: async (req, res) => {
        console.log(req.user)
        try {
            let hackensackStudies = await Study.find({lab: 'Hackensack'}).sort({techCompleted: 1, doctorCompleted: 1, studyDate: -1});
            let techs = await User.find({specialAccess: true});
            if (req.user.specialAccess === true) {
                res.render('hackensack.ejs', { hackensack: hackensackStudies, user: req.user, techs: techs, search: '' });
            } else {
                res.status(403).send('Access not permitted.');
            }
        } catch (err) {
            console.error(err);
        }
    },
    getWayneStudies: async (req, res) => {
        console.log(req.user)
        try {
            let wayneStudies = await Study.find({lab: 'Wayne'}).sort({techCompleted: 1, doctorCompleted: 1, studyDate: -1});
            let techs = await User.find({specialAccess: true});
            if (req.user.specialAccess === true) {
                res.render('wayne.ejs', { wayne: wayneStudies, user: req.user, techs: techs, search: '' });
            } else {
                res.status(403).send('Access not permitted.');
            }
        } catch (err) {
            console.error(err);
        }
    },
    getHackensackCPAP: async (req, res) => {
        console.log(req.user)
        try {
            let hackensackStudies = await Study.find({lab: 'Hackensack', osaPositive: true}).sort({techCompleted: 1, studyDate: -1});
            let techs = await User.find({specialAccess: true});
            if (req.user.specialAccess === true) {
                res.render('hackensack-cpap.ejs', { hackensack: hackensackStudies, user: req.user, techs: techs, search: '' });
            } else {
                res.status(403).send('Access not permitted.');
            }
        } catch (err) {
            console.error(err);
        }
    },
    getStudy: async (req, res) => {
        try {
            const study = await Study.findById(req.params.id);
            res.render('study.ejs', { study: study, user: req.user });
        } catch (err) {
            console.error(err);
        }
    },
    searchStudies: async (req, res) => {
        try {
            const session = req.session;
            let search = req.body.searchInput;
            let studies = null;
            let techs = await User.find({specialAccess: true});

            if (search != null) {
                let searchResult = await Study.find({ patientLastName: {$regex: '^' + search, $options: 'i'} }).sort({studyDate: -1})
                .then((data) => {
                    studies = data
                });
            } else {
                search = 'Search'
                let searchResult = await Study.find({}).sort({studyDate: -1})
                .then((data) => {
                    hackensackStudies = data
                });
            }
            res.render('mystudies.ejs', { userStudies: studies, user: req.user, search: search, techs: techs });
        } catch (err) {
            console.log(err);
        }
    },
    searchHackensackStudies: async (req, res) => {
        try {
            const session = req.session;
            let search = req.body.searchInput;
            let hackensackStudies = null;
            let techs = await User.find({specialAccess: true});

            if (search != null) {
                let searchResult = await Study.find({ lab: 'Hackensack', patientLastName: {$regex: '^' + search, $options: 'i'} }).sort({studyDate: -1})
                .then((data) => {
                    hackensackStudies = data
                });
            } else {
                search = 'Search'
                let searchResult = await Study.find({}).sort({studyDate: -1})
                .then((data) => {
                    hackensackStudies = data
                });
            }
            res.render('hackensack.ejs', { hackensack: hackensackStudies, user: req.user, search: search, techs: techs });
        } catch (err) {
            console.log(err);
        }
    },
    searchWayneStudies: async (req, res) => {
        try {
            const session = req.session;
            let search = req.body.searchInput;
            let wayneStudies = null;
            let techs = await User.find({specialAccess: true});

            if (search != null) {
                let searchResult = await Study.find({ lab: 'Wayne', patientLastName: {$regex: '^' + search, $options: 'i'} }).sort({studyDate: -1})
                .then((data) => {
                    wayneStudies = data
                });
            } else {
                search = 'Search'
                let searchResult = await Study.find({}).sort({studyDate: -1})
                .then((data) => {
                    wayneStudies = data
                });
            }
            res.render('wayne.ejs', { wayne: wayneStudies, user: req.user, search: search, techs: techs });
        } catch (err) {
            console.log(err);
        }
    },
    addStudy: async (req, res) => {
        try {
            await Study.create({ // Adds a new study to DB. req.body.*** takes value entered in the DOM.
                lab: req.body.lab,
                patientLastName: req.body.patientLastName,
                patientFirstName: req.body.patientFirstName,
                studyDate: req.body.studyDate,
                studyAmount: req.body.studyAmount,
                techName: req.body.techName,
                comment: req.body.comment,
                techCompleted: false,
                doctorCompleted: false,
            });
                console.log('New study added');
                res.redirect('back');
        } catch (err) {
            console.log(err);
        }
    },
    // deleteStudy: async (req, res) => {
    //     console.log(`Object ID ${req.body.studyObjIdFromJSFile} from ${req.body.studyLabFromJSFile}`);
    //     try {
    //             await Study.findOneAndDelete({_id: req.body.studyObjIdFromJSFile});
    //             console.log('Deleted study');
    //             res.json('Deleted study');
    //     } catch (err) {
    //         console.log(err);
    //     }
    // },
    markTechComplete: async (req, res) => {
        console.log(`Object ID ${req.body.studyObjIdFromJSFile} from ${req.body.studyLabFromJSFile}`); // Gets the ID from parentNode.dataset.id/lab in main.js
        try {
                await Study.findOneAndUpdate({_id: req.body.studyObjIdFromJSFile}, { // Finds DB entry with given ID
                    techCompleted: true // Updates entry to true
                });
                console.log('Study completed by tech');
                res.json('Study completed by tech');
        } catch (err) {
            console.log(err);
        }
    },
    markTechIncomplete: async (req, res) => {
        console.log(`Object ID ${req.body.studyObjIdFromJSFile} from ${req.body.studyLabFromJSFile}`);
        try {
                await Study.findOneAndUpdate({_id: req.body.studyObjIdFromJSFile}, {
                    techCompleted: false
                });
                console.log('Study incompleted by tech');
                res.json('Study incompleted by tech');
        } catch (err) {
            console.log(err);
        }
    },
    markDoctorComplete: async (req, res) => {
        console.log(`Object ID ${req.body.studyObjIdFromJSFile} from ${req.body.studyLabFromJSFile}`);
        try {
                await Study.findOneAndUpdate({_id: req.body.studyObjIdFromJSFile}, {
                    doctorCompleted: true
                });
                console.log('Study completed by doctor');
                res.json('Study completed by doctor');
        } catch (err) {
            console.log(err);
        }
    },
    markDoctorIncomplete: async (req, res) => {
        console.log(`Object ID ${req.body.studyObjIdFromJSFile} from ${req.body.studyLabFromJSFile}`);
        try {
                await Study.findOneAndUpdate({_id: req.body.studyObjIdFromJSFile}, {
                    doctorCompleted: false
                });
                console.log('Study incompleted by doctor');
                res.json('Study incompleted by doctor');
        } catch (err) {
            console.log(err);
        }
    },
    markOSAPositive: async (req, res) => {
        console.log(`Object ID ${req.body.studyObjIdFromJSFile} from ${req.body.studyLabFromJSFile}`);
        try {
                await Study.findOneAndUpdate({_id: req.body.studyObjIdFromJSFile}, {
                    osaPositive: true
                });
                console.log('Patient positive for OSA');
                res.json('Patient positive for OSA');
        } catch (err) {
            console.log(err);
        }
    },
    markOSANegative: async (req, res) => {
        console.log(`Object ID ${req.body.studyObjIdFromJSFile} from ${req.body.studyLabFromJSFile}`);
        try {
                await Study.findOneAndUpdate({_id: req.body.studyObjIdFromJSFile}, {
                    osaPositive: false
                });
                console.log('Patient negative for OSA');
                res.json('Patient negative for OSA');
        } catch (err) {
            console.log(err);
        }
    },
    // Update to current date
    updateMaskFittingDate: async (req, res) => {
        console.log(`Object ID ${req.body.studyObjIdFromJSFile} from ${req.body.studyLabFromJSFile}`);
        const today = new Date();
        try {
                await Study.findOneAndUpdate({_id: req.body.studyObjIdFromJSFile}, {
                    maskFitting: today.toISOString().split('T')[0]
                });
                console.log('Mask fitting date updated');
                res.json('Mask fitting date updated');
        } catch (err) {
            console.log(err);
        }
    },
    updateCPAPOrderDate: async (req, res) => {
        console.log(`Object ID ${req.body.studyObjIdFromJSFile} from ${req.body.studyLabFromJSFile}`);
        const today = new Date();
        try {
                await Study.findOneAndUpdate({_id: req.body.studyObjIdFromJSFile}, {
                    cpapOrder: today.toISOString().split('T')[0]
                });
                console.log('CPAP ordered');
                res.json('CPAP ordered');
        } catch (err) {
            console.log(err);
        }
    },
    updateCPAPReceivedDate: async (req, res) => {
        console.log(`Object ID ${req.body.studyObjIdFromJSFile} from ${req.body.studyLabFromJSFile}`);
        const today = new Date();
        try {
                await Study.findOneAndUpdate({_id: req.body.studyObjIdFromJSFile}, {
                    cpapReceived: today.toISOString().split('T')[0]
                });
                console.log('Patient Received CPAP machine');
                res.json('Patient Received CPAP machine');
        } catch (err) {
            console.log(err);
        }
    },
    updateTechFollowUpDate: async (req, res) => {
        console.log(`Object ID ${req.body.studyObjIdFromJSFile} from ${req.body.studyLabFromJSFile}`);
        const today = new Date();
        try {
                await Study.findOneAndUpdate({_id: req.body.studyObjIdFromJSFile}, {
                    techFollowUp: today.toISOString().split('T')[0]
                });
                console.log('Follow-up date updated');
                res.json('Follow-up date updated');
        } catch (err) {
            console.log(err);
        }
    },
    updateDoctorFollowUpDate: async (req, res) => {
        console.log(`Object ID ${req.body.studyObjIdFromJSFile} from ${req.body.studyLabFromJSFile}`);
        const today = new Date();
        try {
                await Study.findOneAndUpdate({_id: req.body.studyObjIdFromJSFile}, {
                    doctorFollowUp: today.toISOString().split('T')[0]
                });
                console.log('Follow-up date updated');
                res.json('Follow-up date updated');
        } catch (err) {
            console.log(err);
        }
    },
    // Clear current date
    clearMaskFittingDate: async (req, res) => {
        console.log(`Object ID ${req.body.studyObjIdFromJSFile} from ${req.body.studyLabFromJSFile}`);
        try {
                await Study.findOneAndUpdate({_id: req.body.studyObjIdFromJSFile}, {
                    maskFitting: undefined
                });
                console.log('Follow-up date cleared');
                res.json('Follow-up date cleared');
        } catch (err) {
            console.log(err);
        }
    },
    clearCPAPOrderDate: async (req, res) => {
        console.log(`Object ID ${req.body.studyObjIdFromJSFile} from ${req.body.studyLabFromJSFile}`);
        try {
                await Study.findOneAndUpdate({_id: req.body.studyObjIdFromJSFile}, {
                    cpapOrder: undefined
                });
                console.log('CPAP order date cleared');
                res.json('CPAP order date cleared');
        } catch (err) {
            console.log(err);
        }
    },
    clearCPAPReceivedDate: async (req, res) => {
        console.log(`Object ID ${req.body.studyObjIdFromJSFile} from ${req.body.studyLabFromJSFile}`);
        try {
                await Study.findOneAndUpdate({_id: req.body.studyObjIdFromJSFile}, {
                    cpapReceived: undefined
                });
                console.log('CPAP received date cleared');
                res.json('CPAP received date cleared');
        } catch (err) {
            console.log(err);
        }
    },
    clearTechFollowUpDate: async (req, res) => {
        console.log(`Object ID ${req.body.studyObjIdFromJSFile} from ${req.body.studyLabFromJSFile}`);
        try {
                await Study.findOneAndUpdate({_id: req.body.studyObjIdFromJSFile}, {
                    techFollowUp: undefined
                });
                console.log('Follow-up date cleared');
                res.json('Follow-up date cleared');
        } catch (err) {
            console.log(err);
        }
    },
    clearDoctorFollowUpDate: async (req, res) => {
        console.log(`Object ID ${req.body.studyObjIdFromJSFile} from ${req.body.studyLabFromJSFile}`);
        try {
                await Study.findOneAndUpdate({_id: req.body.studyObjIdFromJSFile}, {
                    doctorFollowUp: undefined
                });
                console.log('Follow-up date cleared');
                res.json('Follow-up date cleared');
        } catch (err) {
            console.log(err);
        }
    },

};