var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/splash', function(req, res, next) {
  res.render('splash', { defaultImage: '/images/EarthCountryball.png' });
});


/* GET home page. */
router.get('/game', function (req, res, next) {
  talks =['fuck you', 'lol', 'asdsad'];
  res.render('game', 
  { 
    talks: talks });
    
});

module.exports = router;
