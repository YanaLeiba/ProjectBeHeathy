const mongoose = require('mongoose');

const User = require('./user');
const Doctor = require('./doctor');

const patientSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', default: null},
    card_number: {type: String, required: true},
    name: {type: String, required: true},
    address: { type: String, required: true},
    birthday: { type: Date, required: true},
    height: {type: Number, required: true},
    weight: { type: Number, required: true },
    fullTerm: { type: String, required: true },
    motherName: { type: String, required: true },
    fatherName: { type: String, required: true },
    telephone: { type: String, required: true },
    photo: { type: String, default: null },
});

module.exports = mongoose.model("Patient", patientSchema);