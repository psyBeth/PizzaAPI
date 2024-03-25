"use strict"
/* ------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- */
//User model:
const passwordEncrypt = require('../helpers/passwordEncrypt')

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
        set: passwordEncrypt,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        validate: (email) => email.includes("@") && email.includes("."),
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },

} , {
    collection: "users",
    timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);