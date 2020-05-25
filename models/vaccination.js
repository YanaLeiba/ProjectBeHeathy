const mongoose = require('mongoose');

const Visit = require('./visit');

const vaccinationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    visitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Visit', required: true},
    type: { type: String, required: true },
    date: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("Vaccination", vaccinationSchema);