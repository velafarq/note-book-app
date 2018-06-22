'use strict';

const express = require('express');

const morgan = require('morgan');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { DATABASE_URL, PORT } = require('./config');

const app = express();

const express_jwt = require('express-jwt');

const jsonwebtoken = require('jsonwebtoken');

const jsonParser = require('body-parser').json();

const User = require('./user-model');

const Post = require('./post-model');

const JWT_SECRET = '12345';

app.use(morgan('common'));
app.use(jsonParser);
app.use(express_jwt({ secret: JWT_SECRET }).unless({ path: ['/auth/login', '/auth/register'] }));

app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ message: `You don't have access to that resource!` });
  }
});



app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(_dirname + './public/index.html');
});

app.get('/posts', (req, res) => {
  Post
  .find()
  .then(posts => {
    res.json(posts);
  })
  .catch(err => {
    console.error(err);
    res.status(500).jjson({error: 'something went wrong'});
  });
});

app.post('/posts', (req, res) => {
const requiredFields = ['email', 'title', 'content', 'category'];
for (let i = 0; i < requiredFields.length; i++) {
  const field = requiredFields[i];
  if (!(field in req.body)) {
    const message = `Missing \`${field}\` in request body`;
    console.error(message);
    return res.status(400).send(message);
  }
}

Post
.create({
  email: req.body.email,
  title: req.body.title,
  content: req.body.content,
  category: req.body.category
})
.then(post => res.status(201).json(post))
.catch(err => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' });
});
});


const login = (req, res) => {
  const user = req.body;
  User.findOne({ email: user.email })
    .then(response => {
      console.log(response);
      const userFound = response;
      if (!userFound) {
        return res.status(404).json({ message: 'User not found!' });
      }

      if (userFound.password === user.password) {
        const token = jsonwebtoken.sign({ user: userFound }, JWT_SECRET);
        return res.status(200).json({ token })
      }
        return res.status(401).json({ message: 'Password mismatch' });
    })
    .catch(error => {
      res.status(401).json({ message: 'Password mismatch' });
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

function runServer() {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      DATABASE_URL,
      err => {
        if (err) {
          return reject(err);
        }

        server = app
          .listen(PORT, () => {
            console.log(`Your app is listening on port ${PORT}`);
            resolve();
          })
          .on('error', err => {
            mongoose.disconnect();
            reject(err);
          });
      }
    );
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
}

module.exports = { runServer, app, closeServer };
