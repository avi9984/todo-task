const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, trim: true },
    phone: { type: String, required: true, unique: true, trim: true },
    role: { type: String, required: true, enum: ['User', 'Admin'], default: 'User' },
    password: { type: String, required: true, trim: true, minLength: 8, select: false },
}, { versionKey: false })

const User = mongoose.model('User', userSchema);
module.exports = User;