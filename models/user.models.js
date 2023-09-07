const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const WORK_FACTOR = 10;
const Schema = mongoose.Schema

const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userSchema = new Schema({
    name: {
        type: String,
        required: 'Name is required'
    },
    surname: {
        type: String,
        required: 'Surname is required'
    },
    admin: {
        type: Boolean
    },
    email: {
        type: String,
        required: 'Email is required',
        lowercase: true,
        match: [EMAIL_PATTERN, 'Invalid email format'],
        trim: true
    },
    phonenum: {
        type: String,
        required: 'A valid telephone number is required'
    },
    password: {
        type: String,
        required: 'User password is required',
        minLength: [8, 'User password needs at least 8 characters']
    }, 
}, {timestamps: true})

userSchema.pre('save', function(next) {
    const user = this;

    if(user.isModified('password')) {
        bcrypt.hash(user.password, WORK_FACTOR)
        .then((hash) => {
            user.password = hash;
            next();
        })
        .catch((error) => next(error))
    } else {
        next();
    }
});

userSchema.methods.checkPassword = function(password) {
    const user = this;
    return bcrypt.compare(password, user.password)
};

const User = mongoose.model('User', userSchema)
module.exports = User;