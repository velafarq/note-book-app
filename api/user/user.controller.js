const jsonwebtoken = require('jsonwebtoken');
const User = require('./user.model');
const JWT_SECRET = '12345';

const login = (req, res) => {
    const user  = req.body;
    User.findOne({ email: user.email })
      .then(response => {
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

  module.exports = { login, register };