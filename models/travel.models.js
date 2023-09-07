const mongoose = require("mongoose");
const Schema = mongoose.Schema

const travelSchema = new Schema({
    // users: {
    //     type: Array,
    //     required: true,
    // },
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

//this just for admin