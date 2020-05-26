const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Patient = require('../models/patient');
const chilsStateMonitorTemperature = require('../models/childStateMonitorTemperature');

router.get('/:patientId', (req, res, next) => {
    chilsStateMonitorTemperature.findById(req.params.patientId)
        .populate('patientId')
        .exec()
        .then(vaccination => {
            if (!vaccination) {
                return res.status(404).json({
                    message: 'Patient not found'
                });
            }
            res.status(200).json({
                chilsStateMonitorTemperature: chilsStateMonitorTemperature,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/chilsStateMonitorTemperature/'
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

router.post('/', (req, res, next) => {
    const temperature = {
        temperature: req.body.temperature,
        time: req.body.type
    }
    res.status(201).json({
        message: 'Handlong POST requests to /temperature'
    })
});


router.get('/now/:patientId', (req, res, next) => {
    res.status(200).json({
        message: 'temperature now'
    })
});

router.get('/day', (req, res, next) => {
    res.status(200).json({
        message: 'temperature day'
    })
});

router.get('/weekend', (req, res, next) => {
    res.status(200).json({
        message: 'temperature weekend'
    })
});

router.get('/mounth', (req, res, next) => {
    res.status(200).json({
        message: 'temperature mounth'
    })
});

module.exports = router;