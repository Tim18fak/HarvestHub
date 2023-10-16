const express = require('express');
const { signup, login, reset} = require('../Controller/auth')
const router = express.Router();

router.post('/signup', signup); // Corrected the path here
router.post('/login', login);
module.exports = router;