const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const express_jwt = require('express-jwt');
const jsonParser = require('body-parser').json();


const JWT_SECRET = '12345';

module.exports = app => {
    app.use(morgan('common'));
    app.use(jsonParser);
    app.use(express_jwt({ secret: JWT_SECRET }).unless({ path: ['/auth/login', '/auth/register', '/'] })
);

    app.use(express.static('public'));
    mongoose.Promise = global.Promise;
};