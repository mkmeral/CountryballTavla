var express = require('express');
var router = express.Router();
var ejs = require('ejs');
/* GET game page */
// TODO: Game Variables
router.get('/game', function(req, res, next) {
    res.render('game',
        {

        });
});

/* GET home page. */
router.get('/', function(req, res, next) {
    let howto = ejs.render('howto', {});

    res.render('splash',
      {
          defaultImage: '/images/EarthCountryball.png',
          games: 0,
          users: 0,
          avgWait: 0,
          howto: howto,
      });
});


/* GET home page. */
router.get('/game', function (req, res, next) {
  talks =['fuck you', 'lol', 'asdsad'];
  res.render('game', 
  { 
    talks: talks });
    
});

module.exports = router;
