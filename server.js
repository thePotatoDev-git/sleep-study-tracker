// npm init
// npm install express --save
// touch .gitignore
// touch server.js
// const express = require('express');
// const app = express();
const express = require('express');
const app = express();
const PORT = 9000;
const Mongoose = require('mongoose');
const RemoteDB = ''
const connectDB = async () => {
    Mongoose.connect(RemoteDB)
    .then(client => {
        console.log('MongoDB connection successful')
    })
}
module.exports = connectDB;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.listen(PORT, () =>{
    console.log(`Server running on ${PORT}`);
})