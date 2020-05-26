const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');
const Doctor = require('../models/doctor');

router.get('/', (req, res, next) => {
    User.find()
        .select(' typeUser email password _id')
        .exec()
        .then(docs => {
            console.log((docs));
            if (docs.length >= 0) {
                const response = {
                    count: docs.length,
                    users: docs.map(doc => {
                        return {
                            typeUser: doc.typeUser,
                            email: doc.email,
                            password: doc.password,
                            _id: doc._id,
                            request: {
                                type: "GET",
                                url: "http://localhost:3000/user/" + doc._id
                            }
                        };
                    })
                };
            res.status(200).json(response);
            } else {
                res.status(404).json({
                    message: 'No entries found'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', (req, res, next) => {
    const user = new User({
    _id: new mongoose.Types.ObjectId,
        typeUser: req.body.typeUser,
        email: req.body.email,
        password: req.body.password
    });
    user
        .save()
        .then(result => {
            console.log(result);
            const doctorId = result._id;
            res.status(201).json({
                message: "Created user successfully",
                createUser: {
                    typeUser: result.typeUser,
                    email: result.email,
                    password: result.password,
                    _id: result._id,
                    request: {
                        type: 'POST',
                        url: 'http://localhost:3000/' + result.typeUser + '/' + result._id
                    },
                }
            })
        })
        .catch(err => {
            console.log(err);
             res.status(500).json({error: err})
        });
});

router.get("/:userId", (req, res, next) => {
    const id = req.params.userId;
    //51151
    User.findById(id)
        .select(' typeUser email password _id')
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    user: doc,
                    request: {
                        type: "GET",
                        description: "Get all users",
                        url: "http://localhost:3000/user/"
                    }
                });
            } else {
                res.status(404).json({message: 'No valid entry found for provided Id'});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        });
});

router.patch("/:userId", (req, res, next) => {
    const id = req.params.userId;
    User.update({ _id: id}, { $set: {typeUser: req.body.newTypeUser, email: req.body.newEmail, password: req.body.newPassword}})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "User updated!",
                request: {
                    type: "GET",
                    url: 'http://localhost:3000/user/' + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete("/:userId", (req, res, next) => {
    const id = req.params.userId;
    User.remove({ _id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Delete successful!',
                request: {
                    type: "GET",
                    url: "http://localhost:3000/user/"
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;