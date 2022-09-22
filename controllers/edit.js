const Study = require('../models/Study');

module.exports = {
    getEdit: async (req, res) => {
        try {
            const id = req.params.id;
            Study.find({}, (err, comment) => {
                res.render('edit.ejs', { hackensack: comment, studyId: id, user: req.user });
            });
        } catch (err) {
            console.log(err);
        }
    },
    // getWayneEdit: async (req, res) => {
    //     try {
    //         const id = req.params.id;
    //         await Study.find({}, (err, comment) => {
    //             res.render('editwayne.ejs', { wayne: comment, studyId: id, user: req.user });
    //         });
    //     } catch (err) {
    //         console.log(err);
    //     }
    // },
    editStudy: async (req, res) => {
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
                    if (req.body.lab === 'Hackensack') {
                        res.redirect('/studies/hackensack');
                    } else if (req.body.lab === 'Wayne') {
                        res.redirect('/studies/wayne');
                    }
                }
            );
        } catch (err) {
            console.log(err);
        }
    },
    // editWayneStudy: async (req, res) => {
    //     try {
    //         const id = req.params.id;
    //         await Study.findByIdAndUpdate(
    //             id,
    //             {
    //                 lab: req.body.lab,
    //                 patientFirstName: req.body.patientFirstName,
    //                 patientLastName: req.body.patientLastName,
    //                 studyDate: req.body.studyDate,
    //                 studyAmount: req.body.studyAmount,
    //                 techName: req.body.techName,
    //                 comment: req.body.comment,
    //             },

    //             err => {
    //                 if (err) return res.status(500).send(err);
    //                 res.redirect('/studies/wayne');
    //             }
    //         );
    //     } catch (err) {
    //         console.log(err);
    //     }
    // },
};