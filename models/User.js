const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, 'Please add some text']
    },
    lastName: {
        type: String,
        required: [true, 'Please add some text']
    },
    birthday: {
        type: Date,
        default: Date.now
    },
    martialStatus: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);