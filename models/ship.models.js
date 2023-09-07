const mongoose = require("mongoose");
const Schema = mongoose.Schema

const shipSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    capacity: {
        type: Number,
        required: true,
    },

    active: {
        type: Boolean, default: true
        
    },
    imgUrls: {
        type: String,
    }
})

const Ship = mongoose.model('Ship', shipSchema)
module.exports = Ship;