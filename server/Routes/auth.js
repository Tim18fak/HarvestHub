const express = require('express');
const { signup, login, reset, code} = require('../Controller/auth')
const router = express.Router();

router.get('/code',code)
router.post('/signup', signup); // Corrected the path here
router.post('/login', login);
router.post('/reset', reset)
module.exports = router;