"use strict"
/* ------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
const auth = require('../controllers/auth')

// URL: /auth

// Login/logout:
router.post('/login', auth.login);
router.post('/refresh', auth.refresh);
// router.all('/logout', auth.logout)
router.get('/logout', auth.logout);
/* ------------------------------------------------------- */
module.exports = router