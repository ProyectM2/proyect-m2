const Travel = require('../models/travel.models')

module.exports.home = (req, res, next) => {
    Travel.find({ $expr: { $lt: [{ $size: "$users" }, 15] } })
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
                destination: travel.destination
            }));
            res.render('home', { travels: formattedTravels });
        })
        .catch((error) => next(error))
}