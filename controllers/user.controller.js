const User = require("../models/user.models")


module.exports.login = (req, res, next) => {
    res.render("users/login")
}

module.exports.register = (req, res, next) => {
    res.render("users/register")
}

module.exports.doRegister = (req, res, next) => {
    User.findOne({ phonenum: req.body.phonenum })
    .then((user) => {
      if (user) {
        res.render('users/register', { 
          user: req.body, 
          errors: { 
            phonenum: 'Username already exists' 
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