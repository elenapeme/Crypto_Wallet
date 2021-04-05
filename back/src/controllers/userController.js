const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { response } = require('express');
const User = mongoose.model('user');

exports.register = (req, res) => {
    newUser = new User(req.body);
    newUser.password = bcrypt.hashSync(req.body.password, 10);
    newUser.save((err, user) => {
        if (err) {
            res.status(400).send({
                message: err
            });
        } else {
            user.password = undefined;
            res.json(user);
        }
    });
};

exports.sign_in = (req, res) => {
    console.log(req.body.username);
    console.log(req.body.password);
    User.findOne({
        username: req.body.username
    }, (err, user) => {
        // if (err) throw err;
        console.log(user);
        console.log(user.validPassword(req.body.password));
        // if (!user || !user.validPassword(req.body.password)) {
        //   res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
        // }
        //res.json({ token: jwt.sign({ username: user.username, _id: user._id }, 'RESTFULAPIs') });
    });
    
};

exports.loginRequired = (req, res, next) => {
  if (req.user) {
    next();
  } else {
     res.status(401).json({ message: 'Unauthorized user!!' });
  }
};
exports.profile = (req, res, next) => {
  if (req.user) {
    res.send(req.user);
    next();
  } 
  else {
   return res.status(401).json({ message: 'Invalid token' });
  }
};