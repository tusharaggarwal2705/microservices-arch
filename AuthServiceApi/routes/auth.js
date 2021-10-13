var express = require('express');
const { login } = require('../controllers/login');
const { register } = require('../controllers/register');
var router = express.Router();

router.post('/login-user',login);

router.post('/register-user',register);

module.exports = router;
