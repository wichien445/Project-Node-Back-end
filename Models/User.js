const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    enabled: {
        type: Boolean,
        default: true
    },
    address: String
},{timestamps: true})

module.exports = User = mongoose.model('users', UserSchema)