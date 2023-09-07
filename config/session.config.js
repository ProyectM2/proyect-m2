const esession = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const user = require("../models/user.models")


module.exports.session = esession({
  resave: true,
  secret: "super secret",
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: mongoose.connection._connectionString,
    ttl: 60 * 60 * 24 * 7, // 1 semana
  }),
  cookie: {
    httpOnly: true
  }
});

module.exports.Loadsessionuser = (req, res, next) => {

  const userId = req.session.userId;
  if (userId) {
    user.findById(userId)
    .then((user) => {
      req.user = user;
      res.locals.currentUser = user;
      console.log(user)
      next();
    })
    .catch((error) => next(error));
  } else {
    next();
  }

}