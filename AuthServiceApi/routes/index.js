var express = require('express');
var router = express.Router();

const auth = require('./auth')

/* GET home page. */
router.get('/auth-service', function(req, res, next) {
  res.render('index', { title: 'Hello from auth service' });
});

router.use('/auth', auth);

module.exports = router;
