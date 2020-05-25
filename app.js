const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const doctorRoutes = require('./routes/doctor');
const patientRoutes = require('./routes/patient');
const usersRoutes = require('./routes/user');
const vaccinationRoutes = require('./routes/vaccination');
const visitRoutes = require('./routes/visit');
const sleepRoutes = require('./routes/childStateMonitorSleep');
const pulsRoutes = require('./routes/childStateMonitorPuls');
const tempetatureRoutes = require('./routes/childStateMonitorTemperature');

mongoose.connect('mongodb+srv://Yana:behealthy@cluster0-fxw32.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use('/doctor', doctorRoutes);
app.use('/patient', patientRoutes);
app.use('/user', usersRoutes);
app.use('/vaccination', vaccinationRoutes);
app.use('/visit', visitRoutes);
app.use('/sleep', sleepRoutes);
app.use('/puls', pulsRoutes);
app.use('/temperature', tempetatureRoutes);


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control_Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


app.use((reg, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});


app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});



/*
const patientRoutes = require('./routes/patient');
const usersRoutes = require('./routes/users');
const doctorRoutes = require('./routes/doctor');
const orderRoutes = require('./api/routes/orders');

//Project 0
try {
 /*


  //console.log("Server started... Connection db success!");
  mongoose.Promise = global.Promise;
}
catch (e) {

}

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());




// Routes which sgould handle requests
app.use('/patient', patientRoutes);
app.use('/users', usersRoutes);
app.use('/doctor', doctorRoutes);
/*app.use('/orders', orderRoutes);*/
/*
*/


module.exports = app;