const mongoose = require('mongoose');
const Travel = require('../models/travel.models')

module.exports.home = (req, res, next) => {
    Travel.find({ $expr: { $lt: [{ $size: "$users" }, 15]} })
        .then((travels) => res.render('home', { travels }))
        .catch((error) => next(error))
}