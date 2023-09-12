const mongoose = require('mongoose');
const Travel = require('../models/travel.models')

module.exports.home = (req, res, next) => {
    Travel.find({ "users": { $size: { $lt: 15 } } })
        .then((travels) => res.render('home', { travels }))
        .catch((error) => next(error))
}