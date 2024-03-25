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
        validate: [
            (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password),
            'Password type is incorrect.'
        ],
        set: passwordEncrypt,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        validate: [ 
            (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
            'Email format is incorrect.'
        ]
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