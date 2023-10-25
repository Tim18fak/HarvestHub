const express = require('express')
const {authenticate} = require('../Controller/Chat')
const router = express.Router()

router.post('/chatAuthenticate', authenticate)

module.exports = router