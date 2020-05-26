const express = require('express');
const router = express.Router();


//весь пульс
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handlong GET requests to /pulse'
    })
});

//создать запись
router.post('/', (req, res, next) => {
    const childPuls = {
        pulse: req.body.puls,
        time: req.body.time
    }
    res.status(201).json({
        message: 'Handlong POST requests to /pulse',
        newPuls: childPuls
    })
});

//поиск по ид пациента
router.get('/:pulsId', (req, res, next) => {
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


//текущее состояние
//анализ пульса и отправка сообщений родителям при изменениях
router.get('/now', (req, res, next) => {
    res.status(200).json({
        message: 'Puls now'
    })
});

router.get('/day', (req, res, next) => {
    res.status(200).json({
        message: 'Puls day'
    })
});

router.get('/weekend', (req, res, next) => {
    res.status(200).json({
        message: 'Puls weekend'
    })
});

router.get('/mounth', (req, res, next) => {
    res.status(200).json({
        message: 'Puls mounth'
    })
});

module.exports = router;