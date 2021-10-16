var express = require('express');
var router = express.Router();

const {service}=require('../service-controller/service');
const { customRedisRateLimiter } = require('../services/rate-limiter');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


router.all('/:service/:apiName',customRedisRateLimiter,service)

module.exports = router;
