const Study = require('../models/Study');
const User = require('../models/User');

module.exports = {
    getEdit: async (req, res) => {
        try {
            const id = req.params.id;
            let techs = await User.find({specialAccess: true});
            Study.find({}, (err, comment) => {
                res.render('edit.ejs', { study: comment, studyId: id, user: req.user, techs: techs });
            });
        } catch (err) {
            console.log(err);
        }
    },
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
                    maskFitting: req.body.maskFitting,
                    cpapOrder: req.body.cpapOrder,
                    cpapReceived: req.body.cpapReceived,
                    techFollowUp: req.body.techFollowUp,
                    doctorFollowUp: req.body.doctorFollowUp,
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
    deleteStudy: async (req, res) => {
        try {
            await Study.deleteOne({ _id: req.params.id });
            console.log('Deleted study');
            res.redirect('back');
        } catch (err) {
            console.log(err);
        }
    },
    deleteFromViewStudy: async (req, res) => {
        try {
            await Study.deleteOne({ _id: req.params.id });
            console.log('Deleted study');
            res.redirect('/dashboard');
        } catch (err) {
            console.log(err);
        }
    },
};