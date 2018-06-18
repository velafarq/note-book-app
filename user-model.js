'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const userSchema = mongoose.Schema({
    email: String,
    password: String
});


const User = mongoose.model('User', userSchema);

module.exports = { User };