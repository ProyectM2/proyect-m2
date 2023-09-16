const mongoose = require('mongoose');
const Ship = require("../models/ship.models")
const Travel = require("../models/travel.models")

// module.exports.reserve = (req, res, next) => {
//     res.render("travels/reserve")
// }

module.exports.travelDoCreate = (req, res, next) => {
    const { ship } = req.body
    Travel.create(req.body)
        .then(() => {
            return Ship.findOneAndUpdate(
                { _id: ship },
                { $set: { active: false }}
                
            )
        })
                .then(() => {
                    res.redirect('/cpanel')
                })
        .catch((error) => next(error))
  }

module.exports.travelDelete = (req, res, next) => {

    // const { ship } = req.body
    Travel.findByIdAndDelete(req.params.id)
        .then((travel) => {
            return Ship.findByIdAndUpdate(
                travel.ship,
                { active: true }
            
            )
        })
                .then(() => {
                    res.redirect('/cpanel')
                })
        .catch((error) => next(error))
  }
