const jsonwebtoken = require('jsonwebtoken');
const User = require('./user.model');
const JWT_SECRET = '12345';

const login = (req, res) => {
    const user  = req.body;
    // console.log(user);
    // console.log('test');
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
    const newUser = req.body;
    // console.log('test', newUser);
    // User.findOne({email: newUser.email})
    // .then(response => {
    
    //   const userFound = response;
    //   if (userFound.email === null) {
        User.create({email: newUser.email, password: newUser.password})
        .then(response => {
          const token = jsonwebtoken.sign({ user: newUser }, JWT_SECRET);
          return res.status(200).json({ token })
        });
      };
      // if (userFound.email === newUser.email) {
      //   return res.status(404).json({message: 'This email is already taken!'});
      // }
    // });
    // };  


  module.exports = { login, register };