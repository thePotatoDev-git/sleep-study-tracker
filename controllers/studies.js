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
};

// app.get('/hackensack', (req, res) => {
//     db.collection('hackensack').find().sort({studyDate: -1}).toArray()
//     .then(data => {
//         res.render('hackensack.ejs', { study: data })
//     })
//     .catch(error => console.error(error))
// });