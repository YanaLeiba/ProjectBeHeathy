const mongoose = require('mongoose');

const Patient = require('./patient');

const temperatureSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    patientId: {type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    temperature: { type: Number, required: true },
    time: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("Temperature", temperatureSchema);