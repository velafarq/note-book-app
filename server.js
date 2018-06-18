'use strict';

const express = require('express');

const morgan = require('morgan');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { DATABASE_URL, PORT} = require('./config');

const app = express();

const express_jwt = require('express-jwt');

const jsonwebtoken = require('jsonwebtoken');

const User = require('./user-model');

const JWT_SECRET = '12345';

app.use(morgan('common'));
app.use(express.json());
app.use(express_jwt({ secret: JWT_SECRET}).unless({ path: ['/auth/login', '/auth/register'] }));

app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ message: `You don't have access to that resource!`});
    }
});

app.use(express.static('public'));


app.get('/', function(req, res) {
  
    res.sendFile(_dirname + './public/index.html')
});

const login = (req, res) => {
    const user = req.body;
    User.findOne({ email: user.email})
    .then(response => {
        const userFound = response;
        if(!userFound) {
            return res.status(404).json({ message: 'User not found!'});
        }

        if (userFound.password === user.password) {
            const token = jsonwebtoken.sign({ user: userFound }, JWT_SECRET);

        } else {
            return res.status(401).json({ message: 'Password mismatch '});
        }
    })
    .catch(error => {
        res.status(401).json({ message: 'Password mismatch'});
    });
};

const register = (req, res) => {
    User.create(req.body, response => {
        res.status(201).json(response);
    });
};

app.get('/auth/login', login);
app.post('/auth/register', register);

let server;

function runServer(databaseUrl, port=PORT) {
    console.log(databaseUrl);
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }

      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

function closeServer() {
    return mongoose.disconnect().then(() => {
      return new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close(err => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    });
  }

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
};

module.exports = { runServer, app, closeServer };