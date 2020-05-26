const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handlong GET requests to /sleep'
    })
});

router.post('/', (req, res, next) => {
    const childSleep = {
        sleep: req.body.sleep,
        active: req.body.active,
        time: req.body.time
    }
    res.status(201).json({
        message: 'Handlong POST requests to /sleep'
    })
});

router.get('/:sleepId', (req, res, next) => {
    const id = req.params.pulsId;
    if (id === 'special') {
        res.status(200).json({
            message: "Special ID",
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        });
    }
});



router.get('/now', (req, res, next) => {
    res.status(200).json({
        message: 'sleep now'
    })
});

router.get('/day', (req, res, next) => {
    res.status(200).json({
        message: 'sleep day'
    })
});

router.get('/weekend', (req, res, next) => {
    res.status(200).json({
        message: 'sleep weekend'
    })
});

router.get('/mounth', (req, res, next) => {
    res.status(200).json({
        message: 'sleep mounth'
    })
});

module.exports = router;