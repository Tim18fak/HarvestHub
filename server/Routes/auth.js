const express = require('express');
const { signup, login, reset, code, compareActivationCode,Found__Username} = require('../Controller/auth')
const router = express.Router();

router.get('/code',code)
router.post('/signup', signup); // Corrected the path here
router.post('/login', login);
router.post('/reset', reset);
router.post('/activation',compareActivationCode);
/* fS  means Find Username
:u means username
:tr means true if the user is a farmer*/
router.get('/fS/:u/:tr',Found__Username)
module.exports = router; 