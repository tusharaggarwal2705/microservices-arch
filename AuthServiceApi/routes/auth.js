var express = require('express');
const { login } = require('../controllers/login');
var router = express.Router();

router.post('/login-user',login);

module.exports = router;
