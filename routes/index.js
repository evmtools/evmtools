var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'EVM tools' });
});

router.get('/hextoopcodes', function(req, res, next) {
  res.render('hextoopcodes', { title: 'EVM tools' });
});

router.get('/opcodestohex', function(req, res, next) {
  res.render('opcodestohex', { title: 'EVM tools' });
});

module.exports = router;
