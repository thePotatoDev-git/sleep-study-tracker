const Hackensack = require('../models/HackensackStudy');
const Wayne = require('../models/WayneStudy');

module.exports = {
    getDashboard: async (req, res) => {
        try {
            res.render('dashboard.ejs');
        } catch (err) {
            console.error(err);
        }
    },
    getHackensackStudies: async (req, res) => {
        console.log(req.user)
        try {
            const hackensackStudies = await Hackensack.find().sort({studyDate: -1});
            res.render('hackensack.ejs', { hackensack: hackensackStudies });
        } catch (error) {
            console.error(err);
        }
    },
    getWayneStudies: async (req, res) => {
        console.log(req.user)
        try {
            const wayneStudies = await Wayne.find().sort({studyDate: -1});
            res.render('wayne.ejs', { wayne: wayneStudies });
        } catch (err) {
            console.error(err);
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
    deleteHackensackStudy: async (req, res) => {
        console.log('Object id: ' + req.body.studyObjIdFromJSFile);
        try {
            await Hackensack.findOneAndDelete({_id: req.body.studyObjIdFromJSFile});
            console.log('Deleted Hackensack study');
            res.json('Deleted Hackensack study');
        } catch (err) {
            console.log(err);
        }
    },
};

// app.get('/hackensack', (req, res) => {
//     db.collection('hackensack').find().sort({studyDate: -1}).toArray()
//     .then(data => {
//         res.render('hackensack.ejs', { study: data })
//     })
//     .catch(error => console.error(error))
// });

// // Add new study
// app.post('/addStudy', (req, res) => {
//     if (req.body.lab === 'hackensack') {
//         db.collection('hackensack').insertOne({lab: req.body.lab, lastName: req.body.lastName, firstName: req.body.firstName, studyDate: req.body.studyDate, studyAmount: req.body.studyAmount, techName: req.body.techName})
//         .then(result => {
//             console.log('Hackensack Study Added')
//             res.redirect('/hackensack')
//         })
//     } else if (req.body.lab === 'wayne') {
//         db.collection('wayne').insertOne({lab: req.body.lab, lastName: req.body.lastName, firstName: req.body.firstName, studyDate: req.body.studyDate, studyAmount: req.body.studyAmount, techName: req.body.techName})
//         .then(result => {
//             console.log('Wayne Study Added')
//             res.redirect('/wayne')
//         })
//     }
// });

// // Delete study
// app.delete('/deleteStudy', (req, res) => {
//     db.collection('studies').deleteOne({lastName: req.body.lastNameS, firstName: req.body.firstNameS, studyDate: req.body.studyDateS })
//     .then(result => {
//         console.log('Study deleted')
//         res.json('Study deleted')
//     })
//     .catch(error => console.error(error))
// });

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html')
// });