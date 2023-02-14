const Study = require('../models/Study');
const User = require('../models/User');

module.exports = {
    getDashboard: async (req, res) => {
        try {
            let studies = await Study.find({techName: req.user.firstName, techCompleted: false}).sort({studyDate: -1});

            if (req.user.specialAccess === true) {
                res.render('dashboard.ejs', { user: req.user, userStudies: studies });
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
            await Study.create({
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
        console.log(`Object ID ${req.body.studyObjIdFromJSFile} from ${req.body.studyLabFromJSFile}`);
        try {
                await Study.findOneAndUpdate({_id: req.body.studyObjIdFromJSFile}, {
                    techCompleted: true
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
};