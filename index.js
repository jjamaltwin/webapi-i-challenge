// implement your API here
const express = require('express');
const port = 5000;

const server = express();
server.listen(5000, () => {
    console.log(`server listening on port ${port}`);
});




// GET 
server.get('/', (req, res) => {
    res.send('Hello World from Express!');
} );

