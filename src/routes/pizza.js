"use strict"
/* ------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
const pizza = require('../controllers/pizza')
const { isAdmin } = require('../middlewares/permissions');
/* ------------------------------------------------------- */
//* UPLOAD
//? $ npm i multer
// https://expressjs.com/en/resources/middleware/multer.html
// multer module ile "form-data" verileri kabul edebiliriz. Yani dosya yükleme yapılabilir.

const multer = require('multer');
const upload = multer({
    //dest: './uploads',
    storage: multer.diskStorage({
        destination: './uploads',
    }),
});


/* ------------------------------------------------------- */

// URL: /pizzas

router.route('/')
    .get(pizza.list)
    // .post(isAdmin, pizza.create)
    // .post(isAdmin, upload.single('fileInputName'), pizza.create)
    .post(isAdmin, upload.array('fileInputName'), pizza.create) // recommended.
    // .post(isAdmin, upload.any(), pizza.create) // not recommended.

router.route('/:id')
    .get(pizza.read)
    .put(isAdmin, upload.array('fileInputName'), pizza.update)
    .patch(isAdmin, upload.array('fileInputName'), pizza.update)
    .delete(isAdmin, pizza.delete)

/* ------------------------------------------------------- */
module.exports = router