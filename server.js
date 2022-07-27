// npm init
// npm install express --save
// touch .gitignore
// touch server.js
// const express = require('express');
// const app = express();
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const PORT = 9000;
require('dotenv').config();

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'hst-tracker';

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} database`)
        db = client.db(dbName)
    });

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

app.get('/', (req, res) => {
    db.collection('studies').find().sort({studyDate: -1}).toArray()
    .then(data => {
        res.render('index.ejs', { study: data })
    })
    .catch(error => console.error(error))
});

app.post('/addStudy', (req, res) => {
    db.collection('studies').insertOne({lab: req.body.lab, lastName: req.body.lastName, firstName: req.body.firstName, studyDate: req.body.studyDate, studyAmount: req.body.studyAmount, techName: req.body.techName})
    .then(result => {
        console.log('Study Added')
        res.redirect('/')
    })
});

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html')
// });

app.listen(PORT, () =>{
    console.log(`Server running on ${PORT}`)
});