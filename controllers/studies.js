const Hackensack = require('../models/HackensackStudy');
const Wayne = require('../models/WayneStudy');

module.exports = {
    getDashboard: async (req, res) => {
        try {
            if (req.user.specialAccess === true) {
                res.render('dashboard.ejs', { user: req.user });
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
            let hackensackStudies = await Hackensack.find({}).sort({studyDate: -1});
            if (req.user.specialAccess === true) {
                res.render('hackensack.ejs', { hackensack: hackensackStudies, user: req.user, search: '' });
            } else {
                res.status(403).send('Access not permitted.');
            }
        } catch (error) {
            console.error(err);
        }
    },
    getWayneStudies: async (req, res) => {
        console.log(req.user)
        try {
            let wayneStudies = await Wayne.find({}).sort({studyDate: -1});
            if (req.user.specialAccess === true) {
                res.render('wayne.ejs', { wayne: wayneStudies, user: req.user, search: '' });
            } else {
                res.status(403).send('Access not permitted.');
            }
        } catch (err) {
            console.error(err);
        }
    },
    searchHackensackStudies: async (req, res) => {
        try {
            const session = req.session;
            let search = req.body.searchInput;
            let hackensackStudies = null;
            let query = {patientLastName: {$regex: '^' + search, $options: 'i'}};

            if (search != null) {
                let searchResult = await Hackensack.find(query).sort({studyDate: -1})
                .then((data) => {
                    hackensackStudies = data
                });
            } else {
                search = 'Search'
                let searchResult = await Hackensack.find({}).sort({studyDate: -1})
                .then((data) => {
                    hackensackStudies = data
                });
            }
            res.render('hackensack.ejs', { hackensack: hackensackStudies, user: req.user, search: search });
        } catch (err) {
            console.log(err);
        }
    },
    searchWayneStudies: async (req, res) => {
        try {
            const session = req.session;
            let search = req.body.searchInput;
            let wayneStudies = null;
            let query = {patientLastName: {$regex: '^' + search, $options: 'i'}};

            if (search != null) {
                let searchResult = await Wayne.find(query).sort({studyDate: -1})
                .then((data) => {
                    wayneStudies = data
                });
            } else {
                search = 'Search'
                let searchResult = await Wayne.find({}).sort({studyDate: -1})
                .then((data) => {
                    wayneStudies = data
                });
            }
            res.render('wayne.ejs', { wayne: wayneStudies, user: req.user, search: search });
        } catch (err) {
            console.log(err);
        }
    },
    addStudy: async (req, res) => {
        try {
            if (req.body.lab === 'hackensack') {
                await Hackensack.create({
                    lab: req.body.lab,
                    patientLastName: req.body.patientLastName,
                    patientFirstName: req.body.patientFirstName,
                    studyDate: req.body.studyDate,
                    studyAmount: req.body.studyAmount,
                    techName: req.body.techName,
                    comment: '',
                    techCompleted: false,
                    doctorCompleted: false,
                });
                console.log('Hackensack study added');
                res.redirect('/studies/hackensack');
            } else if (req.body.lab === 'wayne') {
                await Wayne.create({
                    lab: req.body.lab,
                    patientLastName: req.body.patientLastName,
                    patientFirstName: req.body.patientFirstName,
                    studyDate: req.body.studyDate,
                    studyAmount: req.body.studyAmount,
                    techName: req.body.techName,
                    comment: '',
                    techCompleted: false,
                    doctorCompleted: false,
                });
                console.log('Wayne study added');
                res.redirect('/studies/wayne');
            }
        } catch (err) {
            console.log(err);
        }
    },
    deleteStudy: async (req, res) => {
        console.log(`Object ID ${req.body.studyObjIdFromJSFile} from ${req.body.studyLabFromJSFile}`);
        try {
            if (req.body.studyLabFromJSFile === 'hackensack') {
                await Hackensack.findOneAndDelete({_id: req.body.studyObjIdFromJSFile});
                console.log('Deleted Hackensack study');
                res.json('Deleted Hackensack study');
            } else if (req.body.studyLabFromJSFile === 'wayne') {
                await Wayne.findOneAndDelete({_id: req.body.studyObjIdFromJSFile});
                console.log('Deleted Wayne study');
                res.json('Deleted Wayne study');
            }
        } catch (err) {
            console.log(err);
        }
    },
    markTechComplete: async (req, res) => {
        console.log(`Object ID ${req.body.studyObjIdFromJSFile} from ${req.body.studyLabFromJSFile}`);
        try {
            if (req.body.studyLabFromJSFile === 'hackensack') {
                await Hackensack.findOneAndUpdate({_id: req.body.studyObjIdFromJSFile}, {
                    techCompleted: true
                });
                console.log('Hackensack study completed by tech');
                res.json('Hackensack study completed by tech');
            } else if (req.body.studyLabFromJSFile === 'wayne') {
                await Wayne.findOneAndUpdate({_id: req.body.studyObjIdFromJSFile}, {
                    techCompleted: true
                });
                console.log('Wayne study completed by tech');
                res.json('Wayne study completed by tech');
            }
        } catch (err) {
            console.log(err);
        }
    },
    markTechIncomplete: async (req, res) => {
        console.log(`Object ID ${req.body.studyObjIdFromJSFile} from ${req.body.studyLabFromJSFile}`);
        try {
            if (req.body.studyLabFromJSFile === 'hackensack') {
                await Hackensack.findOneAndUpdate({_id: req.body.studyObjIdFromJSFile}, {
                    techCompleted: false
                });
                console.log('Hackensack study incompleted by tech');
                res.json('Hackensack study incompleted by tech');
            } else if (req.body.studyLabFromJSFile === 'wayne') {
                await Wayne.findOneAndUpdate({_id: req.body.studyObjIdFromJSFile}, {
                    techCompleted: false
                });
                console.log('Wayne study incompleted by tech');
                res.json('Wayne study incompleted by tech');
            }
        } catch (err) {
            console.log(err);
        }
    },
    markDoctorComplete: async (req, res) => {
        console.log(`Object ID ${req.body.studyObjIdFromJSFile} from ${req.body.studyLabFromJSFile}`);
        try {
            if (req.body.studyLabFromJSFile === 'hackensack') {
                await Hackensack.findOneAndUpdate({_id: req.body.studyObjIdFromJSFile}, {
                    doctorCompleted: true
                });
                console.log('Hackensack study completed by doctor');
                res.json('Hackensack study completed by doctor');
            } else if (req.body.studyLabFromJSFile === 'wayne') {
                await Wayne.findOneAndUpdate({_id: req.body.studyObjIdFromJSFile}, {
                    doctorCompleted: true
                });
                console.log('Wayne study completed by doctor');
                res.json('Wayne study completed by doctor');
            }
        } catch (err) {
            console.log(err);
        }
    },
    markDoctorIncomplete: async (req, res) => {
        console.log(`Object ID ${req.body.studyObjIdFromJSFile} from ${req.body.studyLabFromJSFile}`);
        try {
            if (req.body.studyLabFromJSFile === 'hackensack') {
                await Hackensack.findOneAndUpdate({_id: req.body.studyObjIdFromJSFile}, {
                    doctorCompleted: false
                });
                console.log('Hackensack study incompleted by doctor');
                res.json('Hackensack study incompleted by doctor');
            } else if (req.body.studyLabFromJSFile === 'wayne') {
                await Wayne.findOneAndUpdate({_id: req.body.studyObjIdFromJSFile}, {
                    doctorCompleted: false
                });
                console.log('Wayne study incompleted by doctor');
                res.json('Wayne study incompleted by doctor');
            }
        } catch (err) {
            console.log(err);
        }
    },
};