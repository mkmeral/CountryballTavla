var express = require('express');
var router = express.Router();
var ejs = require('ejs');
var messages = require('./../public/javascripts/messages');


/* GET game page. */
router.get('/game', function (req, res, next) {
    res.render('game',
        {
            talks: messages.MESSAGES
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



module.exports = router;
