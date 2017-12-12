var express = require('express');
var router = express.Router();
var fs = require('file-system');

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  var matches = JSON.parse(fs.readFileSync('data/cleaned_info/games.json'));
  return res.status(201).send(matches);
});

router.get('/allBalls', function(req, res, next) {
  //res.send('respond with a resource');
  var balls = JSON.parse(fs.readFileSync('data/cleaned_info/allBalls.json'));
  return res.status(201).send(balls);
});

router.get('/:matchID', function(req, res, next) {
    var fileName = req.params.matchID + ".json";
    var matchBalls = JSON.parse(fs.readFileSync('data/newGames/' + fileName));
    return res.status(201).send(matchBalls);
});



module.exports = router;
