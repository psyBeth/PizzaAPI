"use strict"
/* ------------------------------------------------------- */

const nodemailer = require('nodemailer');

module.exports = function (to, subject, message) {
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
    //* GoogleMail (gmail):
    //* Google -> AccountHome -> Security -> Two-Step-Verify -> App-Passwords
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'betulkoru06@gmail.com',
            pass: 'mzpf ieyk kylc vaxk', // created an app password 
        }
    });
    //* SendMail:
    transporter.sendMail({
        to: to,
        subject: subject,
        text: message,
        html: message,
    }, (error, success) => console.log(success, error));

};