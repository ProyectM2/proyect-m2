const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");

module.exports = session({
  resave: true,
  secret: "super secret",
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: mongoose.connection._connectionString,
    ttl: 60 * 60 * 24 * 7, // 1 semana
  }),
});