const mongoose = require('mongoose');
const User = require("../models/user.models");



module.exports.login = (req, res, next) => {
    res.render("users/login")
}

module.exports.doLogin = (req, res, next) => {

  function renderInvalidUsername() {
    res.render('users/login', {
      user: req.body,
      errors: {
        password: 'Invalid username or password'
      }
    })
  }

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return user.checkPassword(req.body.password)
          .then((match) => {
            if (match) {
              req.session.userId = user.id;
              res.redirect('/home')
            } else {
              renderInvalidUsername();
            }
          })
      } else {
        renderInvalidUsername();
      }
    })
    .catch((error) => next(error));
}

module.exports.register = (req, res, next) => {
    res.render("users/register")
}

module.exports.doRegister = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        res.render('users/register', { 
          user: req.body, 
          errors: { 
            email: 'Email already exists' 
          } 
        })
      } else {
        return User.create(req.body)
          .then(() => {
            res.redirect('/login')
          })
      }
    })
    .catch((error) => {
      console.error(error);
      if (error instanceof mongoose.Error.ValidationError) {
        res.render('users/register', { user: req.body, errors: error.errors })
      } else {
        next(error);
      }
    })
    
}

module.exports.profile = (req, res, next) => {
  res.render('users/profile', { user: req.user })
}