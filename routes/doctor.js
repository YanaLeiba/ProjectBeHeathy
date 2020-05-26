const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Doctor = require('../models/doctor');
const User = require('../models/user');

router.get('/', (req, res, next) => {
    Doctor.find()
        .select('userId name specialty specialization university workAddress phone photo _id')
        .populate('userId', 'typeUser')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                doctors: docs.map(doc => {
                    return {
                        _id: doc._id,
                        userId: doc.userId,
                        name: doc.name,
                        specialty: doc.specialty,
                        specialization: doc.specialization,
                        university: doc.university,
                        workAddress: doc.workAddress,
                        phone: doc.phone,
                        photo: doc.photo,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/doctor/' + doc._id
                        }
                    }
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.post('/:userId', (req, res, next) => {
    const paramsUserId = req.params.userId;
    User.findById(paramsUserId)
        .then(user => {
            if (!user) {
                res.status(404).json({
                    message: "User not found!"
                })
            }
            const doctor = new Doctor({
                _id: mongoose.Types.ObjectId(),
                userId: paramsUserId,
                name: req.body.name,
                specialty: req.body.specialty,
                specialization: req.body.specialization,
                university: req.body.university,
                workAddress: req.body.workAddress,
                phone: req.body.phone,
                photo: req.body.photo
            });
            return doctor
                .save()
                .then(result => {
                    console.log(result);
                    res.status(200).json({
                        message: 'Doctor add',
                        newDoctor: {
                            _id: result._id,
                            userId: result.userId,
                            name: result.name,
                            specialty: result.specialty,
                            specialization: result.specialization,
                            university: result.university,
                            workAddress: result.workAddress,
                            phone: result.phone,
                            photo: result.photo
                        },
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/doctor/' + result._id
                        }
                    });
                })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:doctorId', (req, res, next) => {
    Doctor.findById(req.params.doctorId)
        .populate('userId')
        .exec()
        .then(doctor => {
            if (!doctor) {
                return res.status(404).json({
                    message: 'Doctor not found'
                });
            }
            res.status(200).json({
                doctor: doctor,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/doctor/'
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

router.patch("/:doctorId", (req, res, next) => {
    const id = req.params.doctorId;
    Doctor.update({ _id: id}, { $set: {name: req.body.name,
            specialty: req.body.specialty,
            specialization: req.body.specialization,
            university: req.body.university,
            workAddress: req.body.workAddress,
            phone: req.body.phone,
            photo: req.body.photo}})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Doctor updated!",
                request: {
                    type: "GET",
                    url: 'http://localhost:3000/patient/' + id
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

router.delete("/:doctorId", (req, res, next) => {
    const id = req.params.doctorId;
    Doctor.remove({ _id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Delete successful!',
                request: {
                    type: "GET",
                    url: "http://localhost:3000/doctor/"
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

router.get("/search/:name", (req, res, next) => {
    Doctor.find({"name": req.params.name})
        .select('userId name specialty specialization university workAddress phone photo _id')
        .populate('userId', 'typeUser')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                doctors: docs.map(doc => {
                    return {
                        _id: doc._id,
                        userId: doc.userId,
                        name: doc.name,
                        specialty: doc.specialty,
                        specialization: doc.specialization,
                        university: doc.university,
                        workAddress: doc.workAddress,
                        phone: doc.phone,
                        photo: doc.photo,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/doctor/' + doc._id
                        }
                    }
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});



module.exports = router;