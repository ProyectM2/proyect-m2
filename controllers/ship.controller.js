const mongoose = require('mongoose');
const Ship = require("../models/ship.models")

module.exports.list = (req, res, next) => {
    Ship.find({ active: true })
        .then((ships) => res.render('/cpanel', {ships}))
        .catch((error) => next(error))
}

module.exports.shipDoCreate = (req, res, next) => {
    delete req.body.active
    Ship.create(req.body)
      .then(() => {
        res.redirect('/cpanel')
      })
      .catch((error) => next(error))
  }