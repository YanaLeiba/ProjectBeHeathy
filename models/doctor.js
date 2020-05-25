const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    specialization: { type: String, required: true },
    university: { type: String, required: true },
    workAddress: { type: String, required: true },
    phone: { type: String, required: true },
    photo: { type: String, default: null }
});

module.exports = mongoose.model("Doctor", doctorSchema);