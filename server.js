// npm init
// npm install express --save
// touch .gitignore
// touch server.js
// const express = require('express');
// const app = express();
const express = require('express');
const app = express();
const PORT = 9000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.listen(PORT, () =>{
    console.log(`Server running on ${PORT}`);
})