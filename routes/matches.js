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
  var balls = JSON.parse(fs.readFileSync('data/cleaned_info/allBallsWithKey.json'));
  return res.status(201).send(balls);
});

router.get('/batsman/:batID', function(req, res, next) {
  //res.send('respond with a resource');
  var balls = JSON.parse(fs.readFileSync('data/cleaned_info/allBallsWithKey.json'));
  var result = balls.filter(function(d) { return d.batsman == req.params.batID; })
  return res.status(201).send(result);
});

router.get('/bowler/:bowlID', function(req, res, next) {
  //res.send('respond with a resource');
  var balls = JSON.parse(fs.readFileSync('data/cleaned_info/allBallsWithKey.json'));
  var result = balls.filter(function(d) { return d.bowler == req.params.bowlID; })
  return res.status(201).send(result);
});

router.get('/:matchID', function(req, res, next) {
    var fileName = req.params.matchID + ".json";
    var matchBalls = JSON.parse(fs.readFileSync('data/newGames/' + fileName));
    return res.status(201).send(matchBalls);
});

router.get("/boundaries/:batsmanID", function(req, res, next) {
    var balls = JSON.parse(fs.readFileSync('data/cleaned_info/allBallsWithKey.json'));
    var boundaries = balls.filter(function(d) {
        var condition1 = (d.batsman == parseInt(req.params.batsmanID));
        var condition2 = (d.runs_batter == 4 || d.runs_batter == 6);
        return condition1 && condition2;
    })
    return res.status(201).send(boundaries);
})

module.exports = router;
