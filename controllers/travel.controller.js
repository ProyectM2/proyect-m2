const mongoose = require("mongoose");
const Ship = require("../models/ship.models");
const Travel = require("../models/travel.models");
const User = require('../models/user.models')

 module.exports.reserve = (req, res, next) => {
     res.render("travels/reserve")
 }

module.exports.travelDoCreate = (req, res, next) => {
  const { ship } = req.body;
  Travel.create(req.body)
    .then(() => {
      return Ship.findOneAndUpdate({ _id: ship }, { $set: { active: false } });
    })
    .then(() => {
      res.redirect("/cpanel");
    })
    .catch((error) => next(error));
};

module.exports.travelDelete = (req, res, next) => {
  // const { ship } = req.body
  Travel.findByIdAndDelete(req.params.id)
    .then((travel) => {
      return Ship.findByIdAndUpdate(travel.ship, { active: true });
    })
    .then(() => {
      res.redirect("/cpanel");
    })
    .catch((error) => next(error));
};

module.exports.accept = (req, res, next) => {
    const travelId = req.params.id;
    Travel.findById(travelId)
        .then((travel) => {
            const formattedTravel = {
                _id: travel._id,
                date: travel.date.toLocaleString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                }),
                destination: travel.destination,
                ship: travel.ship.name
            };

            res.render('travels/accept', { travel: formattedTravel });
        })
        .catch((error) => next(error))
}

module.exports.doAccept = (req, res, next) => {
    Travel.findById(req.params.id)
        .then((travel) => {
            if(!travel.users.includes(req.user._id)) {
                travel.users.push(req.user._id)
                return travel.save();
            } else {
                return Promise.resolve(travel);
            }
        })
            .then((travel) => {
                res.redirect('/profile')
            })
        .catch((error) => next(error))
}

