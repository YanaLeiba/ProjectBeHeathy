const mongoose = require('mongoose');

const Patient = require('./patient');

const sleepSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    patientId: {type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    sleep: { type: Boolean, default: true },
    active: { type: Boolean, default: false },
    time: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("Sleep", sleepSchema);