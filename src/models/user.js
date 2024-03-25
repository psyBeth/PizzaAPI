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
        // validate: [
        //     (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password),
        //     'Password type is incorrect.'
        // ],
        // set: passwordEncrypt,
        //? 1ST METHOD
        // set: (password) => {
        //     if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password)) {
        //         return passwordEncrypt(password);
        //     } else {
        //         res.errorStatusCode = 403;
        //         throw new Error('Password type is incorrect.');
        //     }; 
        // },
        //? 2ND METHOD
        set: (password) => {
            if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password)) {
                return passwordEncrypt(password)
            } else {
                return 'wrong'
            }
        },
        validate: (password) => (password != 'wrong'),
        // can also be done with middleware, but this is easier
        // in mongoose set function works before from validate function, thats why we are gonna make validation in set function
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