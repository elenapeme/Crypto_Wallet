const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { response } = require('express');
const User = mongoose.model('user');

exports.sign_in = (req, res) => {
    User.findOne({
        username: req.body.username
    }, (err, user) => {
      if(!user || user === null) {
        res.status(400).send({ message: "The username does not exist" });
      } else {
        // Compare hashed password with the password written
        let bool = bcrypt.compareSync(req.body.password, user.password);

        if (bool === false) {
          res.status(400).send({ message: "The password is invalid" });
          
        }

        res.json({ token: user._id });
      }
      
    });
    
};

exports.loginRequired = (req, res, next) => {
  if (req.user) {
    next();
  } else {
     res.status(401).json({ message: 'Unauthorized user!!' });
  }
};