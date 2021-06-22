var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

let userSchema = require('../models/users');

router.post('/register', function (req, res, next) {
  userSchema
    .findOne({ email: req.body.email })
    .then((user) => {
      if (user != null) {
        var err = new Error('User ' + req.body.email + ' already exists!');
        err.status = 403;
        next(err);
      } else {
        return userSchema.create({
          email: req.body.email,
          name: req.body.name,
          password: req.body.password,
        });
      }
    })
    .then(
      (user) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ status: 'Registration Successful!', user: user });
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

router.route('/login').all(function (req, res, next) {
  const email = req.body.email;
  console.log('🚀 ~ file: userRouter.js ~ line 36 ~ req.body', req.body);
  console.log('🚀 ~ file: userRouter.js ~ line 36 ~ email', email);
  const password = req.body.password;
  console.log('🚀 ~ file: userRouter.js ~ line 38 ~ password', password);

  userSchema
    .findOne({ email: req.body.email })
    .then((user) => {
      if (user == null) {
        var err = new Error('email and password does not match!');
        err.status = 403;
        return next(err);
      } else if (user.password !== password) {
        var err = new Error('Your password is incorrect!');
        err.status = 403;
        return next(err);
      } else if (user.email === email && user.password === password) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ status: 'Login Successful!' });
      } else {
        var err = new Error('Unknown Error');
        err.status = 403;
        return next(err);
      }
    })
    .catch((err) => next(err));
});

module.exports = router;
