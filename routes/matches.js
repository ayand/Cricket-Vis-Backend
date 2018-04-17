var express = require('express');
var router = express.Router();
var fs = require('file-system');
var d3 = require('d3');

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

router.get('/:matchID/partnerships', function(req, res, next) {
    var fileName = "partnerships.json";
    var partnerships = JSON.parse(fs.readFileSync('data/cleaned_info/partnerships.json')).filter(function(d) {
        return d.game == parseInt(req.params.matchID)
    });
    return res.status(201).send(partnerships);
});

router.get('/team/:teamName', function(req, res, next) {
    var teamNameDict = {
          "afghanistan": "Afghanistan",
          "australia": "Australia",
          "bangladesh": "Bangladesh",
          "england": "England",
          "india": "India",
          "ireland": "Ireland",
          "nz": "New Zealand",
          "pakistan": "Pakistan",
          "scotland": "Scotland",
          "sa": "South Africa",
          "sl": "Sri Lanka",
          "uae": "United Arab Emirates",
          "wi": "West Indies",
          "zimbabwe": "Zimbabwe"
    }
    var properName = teamNameDict[req.params.teamName];
    var relevantBalls = JSON.parse(fs.readFileSync('data/cleaned_info/allBalls.json'))
        .filter(function(d) {
            return d.batting_team == properName || d.bowling_team == properName;
        });

    var battingBalls = relevantBalls.filter(function(d) { return d.batting_team == properName; })
    var bowlingBalls = relevantBalls.filter(function(d) { return d.bowling_team == properName; });

    var games = JSON.parse(fs.readFileSync('data/cleaned_info/games.json'))

    var organizedBattingBalls = d3.nest()
        .key(function(d) { return d.game; })
        .sortKeys(d3.ascending)
        .sortValues(function(a, b) { return parseInt(a[""]) - parseInt(b[""]); })
        .entries(battingBalls);

    var organizedBowlingBalls = d3.nest()
        .key(function(d) { return d.game; })
        .sortKeys(d3.ascending)
        .sortValues(function(a, b) { return parseInt(a[""]) - parseInt(b[""]); })
        .entries(bowlingBalls);

    var divisions = [organizedBattingBalls, organizedBowlingBalls];

    divisions.forEach(function(theGames) {
        theGames.forEach(function(theGame) {
          var gameID = theGame.key;
          var relevantGame = games.filter(function(d) { return d.match_id == gameID; })[0];
          theGame["date"] = relevantGame.date;
          theGame["opponent"] = properName == relevantGame.team1_name ? relevantGame.team2_name : relevantGame.team1_name;
          theGame["winning_team"] = relevantGame.winning_team;
        })
    })

    var result = {
        "batting_balls": organizedBattingBalls,
        "bowling_balls": organizedBowlingBalls
    }

    return res.status(201).send(result);
})

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
