const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});


const User = require('../models/user');
const Patient = require('../models/patient');

router.get('/', (req, res, next) => {
    Patient.find()
        .select('_id userId doctorId card_number name address birthday height weight fullTerm motherName fatherName telephone photo')
        .populate('userId')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                patients: docs.map(doc => {
                    return {
                        _id: doc._id,
                        userId: doc.userId,
                        doctorId: doc.doctorId,
                        card_number: doc.card_number,
                        name: doc.name,
                        address: doc.address,
                        birthday: doc.birthday,
                        height: doc.height,
                        weight: doc.weight,
                        fullTerm: doc.fullTerm,
                        motherName: doc.motherName,
                        fatherName: doc.fatherName,
                        telephone: doc.telephone,
                        photo: doc.photo,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/patient/' + doc._id
                        }
                    }
                })
            });
        })
        .catch((err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        }));
});

router.post('/:userId', (req, res, next) => {
//    console.log(req.file);
    const paramsUserId = req.body.userId;
    User.findById(paramsUserId)
        .then(user => {
            if (!user) {
                res.status(404).json({
                    message: "User not found!"
                })
            }
            const patient = new Patient({
                _id: mongoose.Types.ObjectId(),
                userId:paramsUserId,
                card_number: req.body.card_number,
                name: req.body.name,
                address: req.body.address,
                birthday: req.body.birthday,
                height: req.body.height,
                weight: req.body.weight,
                fullTerm: req.body.fullTerm,
                motherName: req.body.motherName,
                fatherName: req.body.fatherName,
                telephone: req.body.telephone,
                photo: req.body.photo,
            });
            return patient
                .save()
                .then(result => {
                    console.log(result);
                    res.status(200).json({
                        message: 'Patient add',
                        newPatient: {
                            _id: result._id,
                            userId: result.userId,
                            card_number: result.card_number,
                            name: result.name,
                            address: result.address,
                            birthday: result.birthday,
                            height: result.height,
                            weight: result.weight,
                            fullTerm: result.fullTerm,
                            motherName: result.motherName,
                            fatherName: result.fatherName,
                            telephone: result.telephone,
                            photo: result.photo,
                        },
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/patient/' + result._id
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

router.get("/:patientId", (req, res, next) => {
    Patient.findById(req.params.patientId)
        .populate('userId')
        .exec()
        .then(patient => {
            if (!patient) {
                return res.status(404).json({
                    message: 'Patient not found'
                });
            }
            res.status(200).json({
                patient: patient,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/patient/'
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

router.patch('/:patientID', (req, res, next) => {
    const id = req.params.patientID;
        Patient.update({ _id: id}, { $set: {name: req.body.name,
                address: req.body.address,
                birthday: req.body.birthday,
                height: req.body.height,
                weight: req.body.weight,
                fullTerm: req.body.fullTerm,
                motherName: req.body.motherName,
                fatherName: req.body.fatherName,
                telephone: req.body.telephone,
                photo: req.body.photo,}})
            .exec()
            .then(result => {
                console.log(result);
                res.status(200).json({
                    message: "User updated!",
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

router.delete('/:patientId', (req, res, next) => {
    const id = req.params.patientId;
    Patient.remove({ _id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Delete successful!',
                request: {
                    type: "GET",
                    url: "http://localhost:3000/patient/"
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

router.get('/search/:name', (req, res, next) => {
    Patient.find({"name": "req.params.name"})
        .select('_id userId doctorId card_number name address birthday height weight fullTerm motherName fatherName telephone photo')
        .populate('')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                patients: docs.map(doc => {
                    return {
                        _id: doc._id,
                        userId: doc.userId,
                        doctorId: doc.doctorId,
                        card_number: doc.card_number,
                        name: doc.name,
                        address: doc.address,
                        birthday: doc.birthday,
                        height: doc.height,
                        weight: doc.weight,
                        fullTerm: doc.fullTerm,
                        motherName: doc.motherName,
                        fatherName: doc.fatherName,
                        telephone: doc.telephone,
                        photo: doc.photo,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/patient/' + doc._id
                        }
                    }
                })
            });
        })
        .catch((err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        }));
});


module.exports = router;