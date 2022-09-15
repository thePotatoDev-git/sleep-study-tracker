const Hackensack = require('../models/HackensackStudy');
const Wayne = require('../models/WayneStudy');

module.exports = {
    getHackensackEdit: async (req, res) => {
        try {
            const id = req.params.id;
            await Hackensack.find({}, (err, comment) => {
                res.render('edithackensack.ejs', { hackensack: comment, studyId: id });
            });
        } catch (err) {
            console.log(err);
        }
    },
    getWayneEdit: async (req, res) => {
        try {
            const id = req.params.id;
            await Wayne.find({}, (err, comment) => {
                res.render('editwayne.ejs', { wayne: comment, studyId: id });
            });
        } catch (err) {
            console.log(err);
        }
    },
    editHackensackStudy: async (req, res) => {
        try {
            const id = req.params.id;
            await Hackensack.findByIdAndUpdate(
                id,
                {
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
            await Wayne.findByIdAndUpdate(
                id,
                {
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