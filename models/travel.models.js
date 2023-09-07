const mongoose = require("mongoose");
const Schema = mongoose.Schema

const travelSchema = new Schema({
    users: {
        type: Array,
        required: true,
    },
    ship: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "ship",
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    
    destination: {
        type: String,
        required: true,
    }
})

const Travel = mongoose.model('Travel', travelSchema)
module.exports = Travel;

//this just for admin