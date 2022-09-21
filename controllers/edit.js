const Study = require('../models/Study');

module.exports = {
    getHackensackEdit: async (req, res) => {
        try {
            const id = req.params.id;
            Study.find({}, (err, comment) => {
                res.render('edithackensack.ejs', { hackensack: comment, studyId: id, user: req.user });
            });
        } catch (err) {
            console.log(err);
        }
    },
    getWayneEdit: async (req, res) => {
        try {
            const id = req.params.id;
            await Study.find({}, (err, comment) => {
                res.render('editwayne.ejs', { wayne: comment, studyId: id, user: req.user });
            });
        } catch (err) {
            console.log(err);
        }
    },
    editHackensackStudy: async (req, res) => {
        try {
            const id = req.params.id;
            await Study.findByIdAndUpdate(
                id,
                {
                    lab: req.body.lab,
                    patientFirstName: req.body.patientFirstName,
                    patientLastName: req.body.patientLastName,
                    studyDate: req.body.studyDate,
                    studyAmount: req.body.studyAmount,
                    techName: req.body.techName,
                    comment: req.body.comment,
                },
                
                err => {
                    if (err) return res.status(500).send(err);
                    res.redirect('/studies/hackensack');
                }
            );
        } catch (err) {
            console.log(err);
        }
    },
    editWayneStudy: async (req, res) => {
        try {
            const id = req.params.id;
            await Study.findByIdAndUpdate(
                id,
                {
                    lab: req.body.lab,
                    patientFirstName: req.body.patientFirstName,
                    patientLastName: req.body.patientLastName,
                    studyDate: req.body.studyDate,
                    studyAmount: req.body.studyAmount,
                    techName: req.body.techName,
                    comment: req.body.comment,
                },

                err => {
                    if (err) return res.status(500).send(err);
                    res.redirect('/studies/wayne');
                }
            );
        } catch (err) {
            console.log(err);
        }
    },
};