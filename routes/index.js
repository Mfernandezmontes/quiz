var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //    vista INDEX
  res.render('index', { title:  'QUIZ' });
});

module.exports = router;
