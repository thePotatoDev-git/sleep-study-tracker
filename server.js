const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const logger = require('morgan');
const moment = require('moment');
const connectDB = require('./config/database');
const mainRoutes = require('./routes/main');
const studiesRoutes = require('./routes/studies');
const editRoutes = require('./routes/edit');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

require('dotenv').config({ path: './config/.env' });
require('./config/passport')(passport);

// Mongo DB connection
connectDB();

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

// Flash middleware
app.use(flash());

// Moment.js middleware
app.use((req, res, next) => {
    res.locals.moment = moment;
    next();
});

// Routes
app.use('/', mainRoutes);
app.use('/studies', studiesRoutes);
app.use('/dashboard', studiesRoutes);
app.use('/study', studiesRoutes);
app.use('/edit', editRoutes);

// Port listening
app.listen(process.env.PORT, () =>{
    console.log(`Server running on ${process.env.PORT}`)
});