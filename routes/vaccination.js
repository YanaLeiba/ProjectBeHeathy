// Добавлять прививки во время визитов
// Без редактирования у удаления
// Все прививки по пациентам (if (idPat = id & visit.vaccination == true)

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Vaccination = require('../models/vaccination');
const Visit = require('../models/visit');

router.get('/:userId', (req, res, next) => {
    Vaccination.find()
        .select('visitId type date _id')
        .populate('visitId', 'patientId')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                visits: docs.map(doc => {
                    return {
                        _id: doc._id,
                        visitId: doc.visitId,
                        type: doc.type,
                        date: doc.date,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/vaccination/' + doc._id
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
    Visit.findById(req.body.visitId)
        .then(user => {
            if (!user) {
                res.status(404).json({
                    message: "Visit not found!"
                })
            }
            const vaccination = new Vaccination({
                _id: mongoose.Types.ObjectId(),
                visitId: req.body.visitId,
                type: req.body.type,
                date: req.body.date,

            });
            return vaccination
                .save()
                .then(result => {
                    console.log(result);
                    res.status(200).json({
                        message: 'Vaccination add',
                        newVaccination: {
                            _id: result._id,
                            visitId: result.visitId,
                            type: result.type,
                            date: result.date,

                        },
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/vaccination/' + result._id
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

router.get('detail/:vaccinationId', (req, res, next) => {
    Vaccination.findById(req.params.vaccinationId)
        .populate('visitId')
        .exec()
        .then(vaccination => {
            if (!vaccination) {
                return res.status(404).json({
                    message: 'vaccination not found'
                });
            }
            res.status(200).json({
                vaccination: vaccination,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/vaccination/'
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});


module.exports = router;