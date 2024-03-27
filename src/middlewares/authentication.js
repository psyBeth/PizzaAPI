"use strict"
/* ------------------------------------------------------- */

const Token = require('../models/token');
const jwt = require('jsonwebtoken');


module.exports = async (req, res, next) => {

    const auth = req.headers?.authorization // Token ...tokenkey... (string)
    const tokenKey = auth ? auth.split(' ') : null;

    if (tokenKey) {

        if (tokenKey[0] == 'Token') {
        // SimpleToken

            const tokenData = await Token.findOne({ token: tokenKey[1] }).populate('userId')
            req.user = tokenData ? tokenData.userId : false

        } else if (tokenKey[0] == 'Bearer') {
        // JWT AccessToken:

            // jwt.verify(accessToken, access_key, callbackFunction())
            jwt.verify(tokenKey[1], process.env.ACCESS_KEY, function(error, accessData) {
                // if(accessData) {
                //     console.log('JWT Verify: OK');
                //     req.user = accessData;
                // } else {
                //     console.log('JWT Verify: NOT OK');
                //     req.user = false;
                // }

                req.user = accessData ? accessData : false;
            });
        };
    };
    next();
};