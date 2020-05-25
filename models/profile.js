const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
    anket: { type: Number },
    time: { type: Date }
});

module.exports = mongoose.model("Profile", profileSchema);