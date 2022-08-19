const validate = require('../validatation/valid')
const express = require('express')
const router = express.Router()

const Contactcontroller = require("../controller/contactcontroller")
router.post('/addcontact', validate.Addcontact, Contactcontroller.createUserId)

router.get('/getAll', validate.authToken, Contactcontroller.getAll)


module.exports = router