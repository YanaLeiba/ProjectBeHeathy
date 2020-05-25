const mongoose = require('mongoose');

const Doctor = require('./doctor');
const Patient = require('./patient');

const visitSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    patientId: {type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    type: {type: String, required: true },
    simptomps: { type: String, required: true },
    treatment: { type: String, required: true },
    notes: { type: String },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    reflexes: { type: String },
    vaccination: { type: Boolean, default: false },
    time: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("Visit", visitSchema);