"use strict"
/*
    $ cp .env-sample .env
    $ npm init -y
    $ npm i express dotenv mongoose express-async-errors
    $ npm i morgan swagger-autogen swagger-ui-express redoc-express
    $ mkdir logs
    $ npm i jsonwebtoken
    $ npm i nodemailer multer
    $ nodemon
*/
const express = require('express')
const app = express()

/* ------------------------------------------------------- */
// Required Modules:

// envVariables to process.env:
require('dotenv').config()
const PORT = process.env?.PORT || 8000

// asyncErrors to errorHandler:
require('express-async-errors')

/* ------------------------------------------------------- */
// Configrations:

// Connect to DB:
const { dbConnection } = require('./src/configs/dbConnection')
dbConnection()

/* ------------------------------------------------------- */
// Middlewares:

// Accept JSON:
app.use(express.json())

// Accept Form-Data:
app.use(express.urlencoded({extended: true }))

// Logger:
app.use(require('./src/middlewares/logger'))

// Auhentication:
app.use(require('./src/middlewares/authentication'))

// findSearchSortPage / res.getModelList:
app.use(require('./src/middlewares/queryHandler'))

/* ------------------------------------------------------- */
//* EMAIL: 
// nodemailer 
// https://www.nodemailer.com/
// https://www.npmjs.com/package/nodemailer
// https://ethereal.email/

// const nodemailer = require('nodemailer');

// Create Test (Fake) account:
// nodemailer.createTestAccount().then((data) => console.log(data))

/* 
    {
        user: 'fe4n7oqlepcl2tsb@ethereal.email',
        pass: 'jK4qAYD4qn4twpHtwY',
        smtp: { host: 'smtp.ethereal.email', port: 587, secure: false },   (for sending)
        imap: { host: 'imap.ethereal.email', port: 993, secure: true },    (for receiving)
        pop3: { host: 'pop3.ethereal.email', port: 995, secure: true },     (improved version of imap)
        web: 'https://ethereal.email'
    }
*/

//* Connect:
// const transporter = nodemailer.createTransport({
    //SMTP:
//     host: 'smtp.ethereal.email',
//     port: 587,
//     secure: false,
//     auth: {
//         user: 'fe4n7oqlepcl2tsb@ethereal.email',
//         pass: 'jK4qAYD4qn4twpHtwY',
//     }
// });
//* SendMail:
// transporter.sendMail({
//     from: 'fe4n7oqlepcl2tsb@ethereal.email',
//     to: 'betulkoru06@gmail.com',
//     subject: 'Hello',
//     text: 'Hello there, how are you doing?',
//     html: '<b>Hello there,</b><p>How are you doing?</p>'
// }, (error, success) => {
//     success ? console.log('SUCCESS', success) : console.log('ERROR', error);
// })

// //* GoogleMail (gmail):
// //* Google -> AccountHome -> Security -> Two-Step-Verify -> App-Passwords
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'betulkoru06@gmail.com',
//         pass: 'mzpf ieyk kylc vaxk', // created an app password 
//     }
// });
// //* SendMail:
// transporter.sendMail({
//     // from: 'betulkoru06@gmail.com',
//     to: 'betulkoru06@gmail.com',
//     subject: 'Hello',
//     text: 'Hello there, how are you doing?',
//     html: '<b>Hello there,</b><p>How are you doing?</p>'
// }, (error, success) => console.log(success, error));

/* ------------------------------------------------------- */
// Routes:

// routes/index.js:
app.use('/', require('./src/routes/'))

// HomePath:
app.all('/', (req, res) => {
    res.send({
        error: false,
        message: 'Welcome to PIZZA API',
        docs: {
            swagger: "/documents/swagger",
            redoc: "/documents/redoc",
            json: "/documents/json",
        },
        user: req.user,
    })
});

// static files:
app.use('/uploads', express.static('./uploads'));

/* ------------------------------------------------------- */

// errorHandler:
app.use(require('./src/middlewares/errorHandler'));

// RUN SERVER:
app.listen(PORT, () => console.log('http://127.0.0.1:' + PORT))

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')() // !!! It clear database.