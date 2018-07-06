const jsonwebtoken = require('jsonwebtoken');
const User = require('./user.model');
const JWT_SECRET = '12345';

const login = (req, res) => {
    const user  = req.body;
   
    User.findOne({ email: user.email })
      .then(response => {
        const userFound = response;
        if (!userFound) {
          return res.status(400).json({ message: 'User cannot be found!' });
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
    const newUser = req.body;

    User.findOne({email: newUser.email})
    .then(response => {
      const userFound = response;
      if (userFound) {
        return res.status(400).json(new Error({ message: 'Try a different email' }));
      }
      else {
        User.create({email: newUser.email, password: newUser.password})
        .then(response => {
          const token = jsonwebtoken.sign({ user: newUser }, JWT_SECRET);
          return res.status(200).json({ token })
        });
      }
    })
    .catch(error => {
      res.status(401).json({ message: 'Did not work' });
    });
    
  };
  


  module.exports = { login, register };