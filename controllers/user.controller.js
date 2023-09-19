const mongoose = require('mongoose');
const User = require("../models/user.models");
const Ship = require("../models/ship.models")
const Travel = require("../models/travel.models");

module.exports.admin = (req, res, next) => {
  Ship.find({ active: true }) 
    .then((ships) => {
      return Travel.find()
        .then ((travels) => {
          res.render("users/cpanel", {travels, ships}) 
        })
    })
    .catch((error) => next(error))
}

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
        delete req.body.admin
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

// module.exports.profile = (req, res, next) => {
//   res.render('users/profile', { user: req.user })
// }


module.exports.profile = (req, res, next) => {
  Travel.find({users: { $in: [req.user._id] }, 
})
      .populate({
          path: 'ship',
          select: 'name capacity'
      })
      .then((travels) => {
          const formattedTravels = travels.map((travel) => ({
              _id: travel._id,
              date: travel.date.toLocaleString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
              }),
              destination: travel.destination,
              ship: travel.ship.name
          }));
          res.render('users/profile', { travels: formattedTravels });
      })
      .catch((error) => next(error))
}

module.exports.logout = (req, res, next) => {
  req.session.destroy();
  res.redirect("/home")
}