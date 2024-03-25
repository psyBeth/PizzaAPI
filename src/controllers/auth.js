"use strict"
/* ------------------------------------------------------- */

const User = require('../models/user');
const Token = require('../models/token');
const passwordEncrypt = require('../helpers/passwordEncrypt');

module.exports = {

    login: async (req, res) => {
        /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Login"
            #swagger.description = 'Login with username (or email) and password for get simpleToken and JWT'
            #swagger.parameters["body"] = {
                in: "body",
                required: true,
                schema: {
                    "username": "test",
                    "password": "aA?123456",
                }
            }
        */
        //* user will choose to login with username or email

        const { username, email, password } = req.body;

        if((username || email) && password) {
            const user = await User.findOne({ $or: [ { username } , { email } ] });
            if(user && user.password == passwordEncrypt(password)){
                if(user.isActive) {
                    /* SIMPLE TOKEN */
                    
                    let tokenData = await Token.findOne({userId: user.id});

                    if(!tokenData) tokenData = await Token.create({
                        userId: user.id,
                        token: passwordEncrypt(user.id + Datenow())
                    })

                    /* SIMPLE TOKEN */

                    res.status(200).send({
                        error: false,
                        token: tokenData.token,
                        user,
                    });

                } else {
                    res.errorStatusCode = 401
                    throw new Error('This account is not active.')
                }
            } else {
                res.errorStatusCode = 401
                throw new Error('Wrong username/email or password.')
            }
        };
    },

    logout: async (req, res) => {

    },

};