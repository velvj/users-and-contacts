const validate = require('../validatation/valid')
const express = require('express')
const router = express.Router()


const Authcontroller = require("../controller/authcontroller")

router.post('/register', validate.signupUser, Authcontroller.register)

router.post('/login', validate.loginUser, Authcontroller.login)

router.get('/getlist', validate.authToken, Authcontroller.getlist)

module.exports = router