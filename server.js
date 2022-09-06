// npm init
// npm install express --save
// touch .gitignore
// touch server.js
// const express = require('express');
// const app = express();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const logger = require('morgan');
const connectDB = require('./config/database');

require('dotenv').config({ path: './config/.env' });
require('./config/passport')(passport);

connectDB();

// let db,
//     dbConnectionStr = process.env.DB_STRING,
//     dbName = 'hst-tracker';

// MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
//     .then(client => {
//         console.log(`Connected to ${dbName} database`)
//         db = client.db(dbName)
//     });

// Account creation - FOR LATER USE
// const Mongoose = require('mongoose');
// const RemoteDB = ''
// const connectDB = async () => {
//     Mongoose.connect(RemoteDB)
//     .then(client => {
//         console.log('MongoDB connection successful')
//     })
// }
// module.exports = connectDB;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger('dev'));

// Sessions
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());


app.get('/', (req, res) => {
    db.collection('wayne').find().sort({studyDate: -1}).toArray(),
    db.collection('hackensack').find().sort({studyDate: -1}).toArray()
    .then(data => {
        res.render('index.ejs', { study: data })
    })
    .catch(error => console.error(error))
});

// Hackensack studies page
app.get('/hackensack', (req, res) => {
    db.collection('hackensack').find().sort({studyDate: -1}).toArray()
    .then(data => {
        res.render('hackensack.ejs', { study: data })
    })
    .catch(error => console.error(error))
});

// Wayne studies page
app.get('/wayne', (req, res) => {
    db.collection('wayne').find().sort({studyDate: -1}).toArray()
    .then(data => {
        res.render('wayne.ejs', { study: data })
    })
    .catch(error => console.error(error))
});

// Add new study
app.post('/addStudy', (req, res) => {
    if (req.body.lab === 'hackensack') {
        db.collection('hackensack').insertOne({lab: req.body.lab, lastName: req.body.lastName, firstName: req.body.firstName, studyDate: req.body.studyDate, studyAmount: req.body.studyAmount, techName: req.body.techName})
        .then(result => {
            console.log('Hackensack Study Added')
            res.redirect('/hackensack')
        })
    } else if (req.body.lab === 'wayne') {
        db.collection('wayne').insertOne({lab: req.body.lab, lastName: req.body.lastName, firstName: req.body.firstName, studyDate: req.body.studyDate, studyAmount: req.body.studyAmount, techName: req.body.techName})
        .then(result => {
            console.log('Wayne Study Added')
            res.redirect('/wayne')
        })
    }
});

// Delete study
app.delete('/deleteStudy', (req, res) => {
    db.collection('studies').deleteOne({lastName: req.body.lastNameS, firstName: req.body.firstNameS, studyDate: req.body.studyDateS })
    .then(result => {
        console.log('Study deleted')
        res.json('Study deleted')
    })
    .catch(error => console.error(error))
});

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html')
// });

app.listen(process.env.PORT, () =>{
    console.log(`Server running on ${process.env.PORT}`)
});