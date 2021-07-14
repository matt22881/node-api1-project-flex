// BUILD YOUR SERVER HERE
const express = require('express')
const Users = require('./users/model')

const server = express()

server.use(express.json())

server.get('/api/users', (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({ message: "The users information could not be retrieved" })
        })
})

server.post('/api/users', (req, res) => {
    if (req.body.name && req.body.bio) {
        Users.insert(req.body)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                res.status(500).json({
                    message: 'There was an error while saving the user to the database'
                })
            })
    } else { res.status(400).json({ message: 'Please provide name and bio for the user' }) }
})

server.get('/api/users/:id', (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            if (user) {
                res.json(user)
            } else res.status(404).json({ message: "The user with the specified ID does not exist" })
        })
        .catch(err => {
            res.status(500).json({ message: "The user information could not be retrieved" })
        })
})

server.delete('/api/users/:id', (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            if (user) {
                Users.remove(req.params.id)
                    .then(user => {
                        res.json(user)
                    })
                    .catch(err => {
                        res.status(500).json({ message: "The user could not be removed" })
                    })
            } else res.status(404).json({ message: "The user with the specified ID does not exist" })
        })
        .catch(err => {
            res.status(500).json(err)
        })

})

server.put('/api/users/:id', (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            if (user) {
                if (req.body.name && req.body.bio) {
                    Users.update(req.params.id, req.body)
                        .then(user => {
                            res.json(user)
                        })
                        .catch(err => {
                            res.status(500).json({ message: "The user information could not be modified" })
                        })
                } else {
                    res.status(400).json({ message: "Please provide name and bio for the user" })
                }
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

server.get('/', (req, res) => {
    res.send('<h1>Welcome to the API Server</h1>')
})

module.exports = server; // EXPORT YOUR SERVER instead of {}