const mongoose = require('mongoose');
const User = require("../models/user.models");



module.exports.login = (req, res, next) => {
    res.render("users/login")
}

module.exports.doLogin = (req, res, next) => {
  User.findOne({ username: req.body.username }).then((user) => { 
    if (user) {
      bcrypt.compare(req.body.password, user.password).then((match) => {
        if (match) {
          req.session.userId = user.id;
          res.redirect(`/home/${user.username}`);
        } else {
          res.redirect("/login");
        }
      });
    } else {
      res.redirect("/login");
    }
  });
};

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