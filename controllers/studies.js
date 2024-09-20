const Study = require('../models/Study');
const User = require('../models/User');

async function updateTechCompleted(studyId, completed) { // Takes parameters of study ID and completed true/false
    await Study.findOneAndUpdate({_id: studyId}, { // Updates object with _id in MongoDB
        techCompleted: completed // Changes techCompleted property in object and changes to argument passed in 'completed'
    });

    return `Study ${completed ? 'completed' : 'incompleted'} by tech`;
}

async function updateDoctorCompleted(studyId, completed) { // Takes parameters of study ID and completed true/false
    await Study.findOneAndUpdate({_id: studyId}, { // Updates object with _id in MongoDB
        doctorCompleted: completed // Changes techCompleted property in object and changes to argument passed in 'completed'
    });

    return `Study ${completed ? 'completed' : 'incompleted'} by doctor`;
}

async function markNetwork(studyId, network) { // Takes parameters of study ID and completed true/false
    await Study.findOneAndUpdate({_id: studyId}, { // Updates object with _id in MongoDB
        inNetwork: network // Changes inNetwork property in object and changes to argument passed in 'positive'
    });

    return `Study ${network ? 'in' : 'out of'} network`;
}

async function markOSA(studyId, positive) { // Takes parameters of study ID and completed true/false
    await Study.findOneAndUpdate({_id: studyId}, { // Updates object with _id in MongoDB
        osaPositive: positive // Changes osaPositive property in object and changes to argument passed in 'positive'
    });

    return `Study ${positive ? 'positive' : 'negative'} for OSA`;
}

async function maskFitDate(studyId, date) { // Takes parameters of study ID and date
    await Study.findOneAndUpdate({_id: studyId}, { // Updates object with _id in MongoDB
        maskFitting: date // Changes maskFitting property in object and changes to date passed in 'date'
    });

    return `Mask fitting ${date ? `on ${date}` : 'cleared'}.`;
}

async function cpapOrderDate(studyId, date) { // Takes parameters of study ID and date
    await Study.findOneAndUpdate({_id: studyId}, { // Updates object with _id in MongoDB
        cpapOrder: date // Changes cpapOrder property in object and changes to date passed in 'date'
    });

    return `CPAP ordered ${date ? `on ${date}` : 'date cleared'}.`;
}

async function cpapReceivedDate(studyId, date) { // Takes parameters of study ID and date
    await Study.findOneAndUpdate({_id: studyId}, { // Updates object with _id in MongoDB
        cpapReceived: date // Changes cpapReceived property in object and changes to date passed in 'date'
    });

    return `CPAP received ${date ? `on ${date}` : 'date cleared'}.`;
}

async function techFollowUpDate(studyId, date) { // Takes parameters of study ID and date
    await Study.findOneAndUpdate({_id: studyId}, { // Updates object with _id in MongoDB
        techFollowUp: date // Changes techFollowUp property in object and changes to date passed in 'date'
    });

    return `Tech follow-up ${date ? `on ${date}` : 'date cleared'}.`;
}

async function doctorFollowUpDate(studyId, date) { // Takes parameters of study ID and date
    await Study.findOneAndUpdate({_id: studyId}, { // Updates object with _id in MongoDB
        doctorFollowUp: date // Changes doctorFollowUp property in object and changes to date passed in 'date'
    });

    return `Doctor follow-up ${date ? `on ${date}` : 'date cleared'}.`;
}

module.exports = {
//////////////////////////////////////////////////////////////////////////
//  GET
//////////////////////////////////////////////////////////////////////////
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
        console.log(req.user)
        try {
            const page = parseInt(req.query.page) || 1; // Read from route parameter
            const limit = 15; 
    
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
    
            const results = await Promise.all([
                Study.find({ techName: req.user.firstName })
                     .sort({ techCompleted: 1, doctorCompleted: 1, studyDate: -1 })
                     .skip(startIndex)
                     .limit(limit),
                Study.countDocuments({ techName: req.user.firstName })
            ]);
            
            const userStudies = results[0];
            const count = results[1];
            const totalPages = Math.ceil(count / limit)
            
            let techs = await User.find({specialAccess: true});
            if (req.user.specialAccess === true) {
                res.render('mystudies.ejs', { 
                    userStudies: userStudies, 
                    user: req.user, 
                    techs: techs, 
                    search: '',
                    currentPage: page, // Pass current page to view
                    totalPages: totalPages, // Pass total pages to view
                 });
            } else {
                res.status(403).send('Access not permitted.');
            }
        } catch (err) {
            console.error(err);
        }
    },
    getHackensackStudies: async (req, res) => {
        console.log(req.user)
        try {
            const page = parseInt(req.query.page) || 1; // Read from route parameter
            const limit = 15; // Entries per page
    
            const startIndex = (page - 1) * limit; // Entry index # (starting from...)
            const endIndex = page * limit; // Entry index # (until...)
    
            // Array of MongoDB documents from Hackensack
            const results = await Promise.all([ // Array of documents
                Study.find({ lab: 'Hackensack' })
                     .sort({ techCompleted: 1, doctorCompleted: 1, studyDate: -1 })
                     .skip(startIndex)
                     .limit(limit),
                Study.countDocuments({ lab: 'Hackensack' }) // Count of entries from Hack
            ]);
            
            const hackensackStudies = results[0]; // Array of Hackensack studies
            const count = results[1]; // Number of Hackensack studies
            const totalPages = Math.ceil(count / limit);
            console.log('Hackensack studies: ', count);
            
            let techs = await User.find({specialAccess: true});
            if (req.user.specialAccess === true) {
                res.render('hackensack.ejs', { 
                    hackensack: hackensackStudies, 
                    user: req.user, 
                    techs: techs, 
                    search: '',
                    currentPage: page, // Pass current page to view
                    totalPages: totalPages, // Pass total pages to view
                 });
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
            const page = parseInt(req.query.page) || 1; // Read from route parameter
            const limit = 15; 
    
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            console.log('endIndex: ', endIndex, 'starIndex: ', startIndex)
    
            const results = await Promise.all([
                Study.find({ lab: 'Wayne' })
                     .sort({ techCompleted: 1, doctorCompleted: 1, studyDate: -1 })
                     .skip(startIndex)
                     .limit(limit),
                Study.countDocuments({ lab: 'Wayne' })
            ]);
            
            const wayneStudies = results[0];
            const count = results[1];
            const totalPages = Math.ceil(count / limit)
            console.log('Wayne studies: ', count);
            
            let techs = await User.find({specialAccess: true});
            if (req.user.specialAccess === true) {
                res.render('wayne.ejs', { 
                    wayne: wayneStudies, 
                    user: req.user, 
                    techs: techs, 
                    search: '',
                    currentPage: page, // Pass current page to view
                    totalPages: totalPages, // Pass total pages to view
                 });
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
            const page = parseInt(req.query.page) || 1; // Read from route parameter
            const limit = 15; 
    
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
    
            const results = await Promise.all([
                Study.find({ lab: 'Hackensack', osaPositive: true })
                     .sort({ techCompleted: 1, doctorCompleted: 1, studyDate: -1 })
                     .skip(startIndex)
                     .limit(limit),
                Study.countDocuments({ lab: 'Hackensack', osaPositive: true })
            ]);
            
            const hackensackStudies = results[0];
            const count = results[1];
            const totalPages = Math.ceil(count / limit)
            console.log('Hackensack CPAP: ', count);
            
            let techs = await User.find({specialAccess: true});
            if (req.user.specialAccess === true) {
                res.render('hackensack-cpap.ejs', { 
                    hackensack: hackensackStudies, 
                    user: req.user, 
                    techs: techs, 
                    search: '',
                    currentPage: page, // Pass current page to view
                    totalPages: totalPages, // Pass total pages to view
                 });
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
//////////////////////////////////////////////////////////////////////////
//  SEARCH DB
//////////////////////////////////////////////////////////////////////////
    searchStudies: async (req, res) => {
        try {
            const session = req.session;
            let search = req.body.searchInput;
            let studies = null;
            let techs = await User.find({specialAccess: true});

            const page = parseInt(req.query.page) || 1; // Read from route parameter
            const limit = 15; 
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;

            if (search != null) {
                let searchResult = await Study.find({ patientLastName: {$regex: '^' + search, $options: 'i'} }).sort({studyDate: -1})
                .then((data) => {
                    studies = data
                });
            } else {
                search = 'Search'
                let searchResult = await Study.find({}).sort({studyDate: -1})
                .then((data) => {
                    studies = data
                });
            }

            const count = studies.length;
            const totalPages = Math.ceil(count / limit)

            res.render('mystudies.ejs', { 
                userStudies: studies, 
                user: req.user, 
                search: search, 
                techs: techs,
                currentPage: page,
                totalPages: totalPages,
            });
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

            const page = parseInt(req.query.page) || 1; // Read from route parameter
            const limit = 15; 
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;

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

            const count = hackensackStudies.length;
            const totalPages = Math.ceil(count / limit)

            res.render('hackensack.ejs', { 
                hackensack: hackensackStudies, 
                user: req.user, 
                search: search, 
                techs: techs, 
                currentPage: page, 
                totalPages: totalPages 
            });
        } catch (err) {
            console.log(err);
        }
    },
    searchHackensackCPAPStudies: async (req, res) => {
        try {
            const session = req.session;
            let search = req.body.searchInput;
            let hackensackStudies = null;
            let techs = await User.find({specialAccess: true});

            const page = parseInt(req.query.page) || 1; // Read from route parameter
            const limit = 15; 
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;

            if (search != null) {
                let searchResult = await Study.find({ lab: 'Hackensack', osaPositive: true, patientLastName: {$regex: '^' + search, $options: 'i'} }).sort({studyDate: -1})
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

            const count = hackensackStudies.length;
            const totalPages = Math.ceil(count / limit)

            res.render('hackensack-cpap.ejs', { 
                hackensack: hackensackStudies, 
                user: req.user, 
                search: search, 
                techs: techs, 
                currentPage: page, 
                totalPages: totalPages 
            });
        } catch (err) {
            console.log(err);
        }
    },
    searchWayneStudies: async (req, res) => {
        try {
            const session = req.session;
            let search = req.body.searchInput; // Gets input from search bar
            let wayneStudies = null;
            let techs = await User.find({specialAccess: true});

            const page = parseInt(req.query.page) || 1; // Read from route parameter
            const limit = 15; 
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;

            if (search != null) { // If text entered into search, run if statement
                // In DB, search for last name in Wayne entries
                let searchResult = await Study.find({ 
                    lab: 'Wayne', 
                    patientLastName: {$regex: '^' + search, $options: 'i'} 
                })
                .sort({studyDate: -1})
                .then((data) => {
                    wayneStudies = data
                });
            } else {
                search = 'Search'
                let searchResult = await Study.find({})
                .sort({studyDate: -1})
                .then((data) => {
                    wayneStudies = data
                });
            }

            const count = wayneStudies.length;
            const totalPages = Math.ceil(count / limit)

            res.render('wayne.ejs', { 
                wayne: wayneStudies, 
                user: req.user, 
                search: search, 
                techs: techs, 
                currentPage: page, 
                totalPages: totalPages, 
            });
        } catch (err) {
            console.log(err);
        }
    },
//////////////////////////////////////////////////////////////////////////
//  ADD STUDY
//////////////////////////////////////////////////////////////////////////
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

//////////////////////////////////////////////////////////////////////////
//  MARK/UPDATE STUDIES
//////////////////////////////////////////////////////////////////////////
    markTechComplete: async (req, res) => {
        console.log(`Object ID ${req.body.studyObjIdFromJSFile} from ${req.body.studyLabFromJSFile}`);
        const message = await updateTechCompleted(req.body.studyObjIdFromJSFile, true); // Runs updateTechCompleted function from above and passes ID and boolean arguments to parameters
        console.log(message);
        res.json(message);
    },
    markTechIncomplete: async (req, res) => {
        console.log(`Object ID ${req.body.studyObjIdFromJSFile} from ${req.body.studyLabFromJSFile}`);
        const message = await updateTechCompleted(req.body.studyObjIdFromJSFile, false);
        console.log(message);
        res.json(message);
    },
    markDoctorComplete: async (req, res) => {
        console.log(`Object ID ${req.body.studyObjIdFromJSFile} from ${req.body.studyLabFromJSFile}`);
        const message = await updateDoctorCompleted(req.body.studyObjIdFromJSFile, true); // Runs updateDoctorCompleted function from above and passes ID and boolean arguments to parameters
        console.log(message);
        res.json(message);
    },
    markDoctorIncomplete: async (req, res) => {
        console.log(`Object ID ${req.body.studyObjIdFromJSFile} from ${req.body.studyLabFromJSFile}`);
        const message = await updateDoctorCompleted(req.body.studyObjIdFromJSFile, false);
        console.log(message);
        res.json(message);
    },
    markInNetwork: async (req, res) => {
        console.log(`Object ID ${req.body.studyObjIdFromJSFile} from ${req.body.studyLabFromJSFile}`);
        const message = await markNetwork(req.body.studyObjIdFromJSFile, true); // Runs markNetwork function from above and passes ID and boolean arguments to parameters
        console.log(message);
        res.json(message);
    },
    markOutNetwork: async (req, res) => {
        console.log(`Object ID ${req.body.studyObjIdFromJSFile} from ${req.body.studyLabFromJSFile}`);
        const message = await markNetwork(req.body.studyObjIdFromJSFile, false); // Runs markNetwork function from above and passes ID and boolean arguments to parameters
        console.log(message);
        res.json(message);
    },
    markOSAPositive: async (req, res) => {
        console.log(`Object ID ${req.body.studyObjIdFromJSFile} from ${req.body.studyLabFromJSFile}`);
        const message = await markOSA(req.body.studyObjIdFromJSFile, true); // Runs markOSA function from above and passes ID and boolean arguments to parameters
        console.log(message);
        res.json(message);
    },
    markOSANegative: async (req, res) => {
        console.log(`Object ID ${req.body.studyObjIdFromJSFile} from ${req.body.studyLabFromJSFile}`);
        const message = await markOSA(req.body.studyObjIdFromJSFile, false);
        console.log(message);
        res.json(message);
    },
    // Update to current date
    updateMaskFittingDate: async (req, res) => {
        console.log(`Object ID ${req.body.studyObjIdFromJSFile} from ${req.body.studyLabFromJSFile}`);
        const today = new Date().toISOString().split('T')[0];
        const message = await maskFitDate(req.body.studyObjIdFromJSFile, today);
        console.log(message);
        res.json(message);
    },
    updateCPAPOrderDate: async (req, res) => {
        console.log(`Object ID ${req.body.studyObjIdFromJSFile} from ${req.body.studyLabFromJSFile}`);
        const today = new Date().toISOString().split('T')[0];
        const message = await cpapOrderDate(req.body.studyObjIdFromJSFile, today);
        console.log(message);
        res.json(message);
    },
    updateCPAPReceivedDate: async (req, res) => {
        console.log(`Object ID ${req.body.studyObjIdFromJSFile} from ${req.body.studyLabFromJSFile}`);
        const today = new Date().toISOString().split('T')[0];
        const message = await cpapReceivedDate(req.body.studyObjIdFromJSFile, today);
        console.log(message);
        res.json(message);
    },
    updateTechFollowUpDate: async (req, res) => {
        console.log(`Object ID ${req.body.studyObjIdFromJSFile} from ${req.body.studyLabFromJSFile}`);
        const today = new Date().toISOString().split('T')[0];
        const message = await techFollowUpDate(req.body.studyObjIdFromJSFile, today);
        console.log(message);
        res.json(message);
    },
    updateDoctorFollowUpDate: async (req, res) => {
        console.log(`Object ID ${req.body.studyObjIdFromJSFile} from ${req.body.studyLabFromJSFile}`);
        const today = new Date().toISOString().split('T')[0];
        const message = await doctorFollowUpDate(req.body.studyObjIdFromJSFile, today);
        console.log(message);
        res.json(message);
    },
    // Clear current date
    clearMaskFittingDate: async (req, res) => {
        console.log(`Object ID ${req.body.studyObjIdFromJSFile} from ${req.body.studyLabFromJSFile}`);
        const message = await maskFitDate(req.body.studyObjIdFromJSFile, undefined);
        console.log(message);
        res.json(message);
    },
    clearCPAPOrderDate: async (req, res) => {
        console.log(`Object ID ${req.body.studyObjIdFromJSFile} from ${req.body.studyLabFromJSFile}`);
        const message = await cpapOrderDate(req.body.studyObjIdFromJSFile, undefined);
        console.log(message);
        res.json(message);
    },
    clearCPAPReceivedDate: async (req, res) => {
        console.log(`Object ID ${req.body.studyObjIdFromJSFile} from ${req.body.studyLabFromJSFile}`);
        const message = await cpapReceivedDate(req.body.studyObjIdFromJSFile, undefined);
        console.log(message);
        res.json(message);
    },
    clearTechFollowUpDate: async (req, res) => {
        console.log(`Object ID ${req.body.studyObjIdFromJSFile} from ${req.body.studyLabFromJSFile}`);
        const message = await techFollowUpDate(req.body.studyObjIdFromJSFile, undefined);
        console.log(message);
        res.json(message);
    },
    clearDoctorFollowUpDate: async (req, res) => {
        console.log(`Object ID ${req.body.studyObjIdFromJSFile} from ${req.body.studyLabFromJSFile}`);
        const message = await doctorFollowUpDate(req.body.studyObjIdFromJSFile, undefined);
        console.log(message);
        res.json(message);
    },

};