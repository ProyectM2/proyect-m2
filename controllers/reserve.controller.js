const mongoose = require('mongoose');
const Travel = require("../models/travel.models")
const Ship = require("../models/ship.models")

module.exports.reserve = (req, res, next) => {
    Travel.find({ $expr: { $lt: [{ $size: "$users" }, 15] } })
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
                    hour: 'numeric',
                    minute: 'numeric',
                }),
                destination: travel.destination,
                ship: travel.ship.name
            }));
            res.render("travels/reserve", { travels: formattedTravels });
        })
        .catch((error) => next(error))
}