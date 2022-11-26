const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true
    },
    email:{
        type: 'string',
        required: true
    },
    password:{
        type: 'string',
        required: true
    },
    date:{
        type: 'Date',
        default:Date.now
    }
});

const User =mongoose.model('User',UserSchema);

module.exports = User;