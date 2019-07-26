// implement your API here
const express = require('express');
const port = 5000;
const server = express();
const users = require('./data/db');
const database = require('./data/db');

server.listen(5000, () => {
    console.log(`server listening on port ${port}`);
});


// POST
server.use(express.json());  // Need to send JSON via post to return readable text 

server.post('/users', (req, res) => {
    const newUser = req.body;

    users.insert(newUser)
    .then(user => {
        res.status(201).json({success: true, user});
    }) .catch(err => {
        res.status(400).json({success: false, err, message:"Please provide name and bio for the user."});
    });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
});

// GET 
server.get('/', (req, res) => {
    res.send('Hello World from Express!');
} );

server.get('/now', (req, res) => {
    const now = new Date().toISOString();
    res.send(now)
})

server.get('/db',(req, res) => {
    database.find().then(db => {
      res.status(200).json(db);
    }) .catch(err => {
        res.status(500).json({success: false, err});
    });
});

server.get('/users', (req, res) => {
    users.find().then(user => {
        res.status(200).json(user);
    }) .catch(err => {
        res.status(500).json({success: false, err, message: "The users information could not be retrieved"});
    });
});

server.get('/users/:id', (req, res) => {
    const {id} = req.params
    users.findById(id)
    .then(user => {
        if(user) {
            res.status(200).json({success: true, user})

        } else {
            res.status(404).json({success: false, message: "The user with the specified ID does not exist."})
        }
    }) .catch(err => {
        res.status(500).json({
            success: false,
            err
        })
    })
});


// Delete 

server.delete('/users/:id', (req, res) => {
    const {id} = req.params; // Destructure id 
    users.remove(id)
    .then(user => {
        if(user) {
            res.status(204).end();
        } else {
            res.status(404).json({
                success: false,
                message: "I cannot find the user you are looking for "
            })
        }
    }) .catch(err => {
        res.status(500).json({ success: false, err})
    })
});

//UPDATE

server.put('/users/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body

    users.update( id, changes)
    .then(updated => {
        if(updated) {
            res.status(200).json({success: true, updated})
        } else {
            res.status(404).json({
                success: false,
                message: "I cannot find the user you are looking for"
            })
        } 
    })  .catch(err => {
        res.status(500).json({ success: false, err})
    })
});
