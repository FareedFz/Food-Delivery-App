const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    phoneNumber: { type: String, required: true, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    address: { type: String },
    countryCode: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);