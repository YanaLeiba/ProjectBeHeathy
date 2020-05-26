const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Doctor = require('../models/doctor');
const User = require('../models/user');
const Visit = require('../models/visit');

router.get('/', (req, res, next) => {
    Visit.find()
        .select('doctorId patientId type simptomps treatment notes height weight reflexes  vaccination time _id')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                visits: docs.map(doc => {
                    return {
                        _id: doc._id,
                        doctorId: doc._doctoeId,
                        patientId: doc.patientId,
                        type: doc.type,
                        simptomps: doc.simptomps,
                        treatment: doc.treatment,
                        notes: doc.notes,
                        height: doc.height,
                        weight: doc.weight,
                        reflexes: doc.reflexes,
                        vaccination: doc.vaccination,
                        time: doc.time,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/visit/' + doc._id
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

router.post('/', (req, res, next) => {
    User.findById(req.body.patientId)
        .then(user => {
            if (!user) {
                res.status(404).json({
                    message: "User not found!"
                })
            }
            const visit = new Visit({
                _id: mongoose.Types.ObjectId(),
                doctorId: req.body._doctoeId,
                patientId: req.body.patientId,
                type: req.body.type,
                simptomps: req.body.simptomps,
                treatment: req.body.treatment,
                notes: req.body.notes,
                height: req.body.height,
                weight: req.body.weight,
                reflexes: req.body.reflexes,
                vaccination: req.body.vaccination,
                time: req.body.time
            });
            return visit
                .save()
                .then(result => {
                    console.log(result);
                    res.status(200).json({
                        message: 'Visit add',
                        newVisit: {
                            _id: mongoose.Types.ObjectId(),
                            doctorId: result._doctoeId,
                            patientId: result.patientId,
                            type: result.type,
                            simptomps: result.simptomps,
                            treatment: result.treatment,
                            notes: result.notes,
                            height: result.height,
                            weight: result.weight,
                            reflexes: result.reflexes,
                            vaccination: result.vaccination,
                            time: result.time
                        },
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/visit/' + result._id
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

router.get('/:vizitId', (req, res, next) => {
    Visit.findById(req.params.visitId)
        .populate('patientId')
        .exec()
        .then(visit => {
            if (!visit) {
                return res.status(404).json({
                    message: 'Visit not found'
                });
            }
            res.status(200).json({
                visit: visit,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/visit/'
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

router.patch('/:doctorId', (req, res, next) => {
    res.status(200).json({
        message: 'Update information!'
    })
});

router.delete("/:visitId", (req, res, next) => {
    const id = req.params.visitId;
    Visit.remove({ _id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Delete successful!',
                request: {
                    type: "GET",
                    url: "http://localhost:3000/visit/"
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

router.get('/search', (req, res, next) => {
    res.status(200).json({
        message: 'Doctor Id'
    })
});

router.get('/add', (req, res, next) => {
    res.status(200).json({
        message: 'Add doctor'
    })
});

module.exports = router;