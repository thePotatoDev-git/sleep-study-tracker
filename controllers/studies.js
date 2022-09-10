const Hackensack = require('../models/HackensackStudy');

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
            const hackensackStudies = await Hackensack.find();
            res.render('hackensack.ejs', { hackensack: hackensackStudies });
        } catch (error) {
            
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