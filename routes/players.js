var express = require('express');
var router = express.Router();
var fs = require('file-system');

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  var players = JSON.parse(fs.readFileSync('data/cleaned_info/players.json'));
  return res.status(201).send(players);
});

router.get('/graph', function(req, res, next) {
    var playerNodes = JSON.parse(fs.readFileSync('data/cleaned_info/playerList.json'));
    var playerEdges = Array.from(new Set(JSON.parse(fs.readFileSync('data/cleaned_info/allBalls.json'))
        .map(function(d) { return { "batsman": d.batsman, "bowler": d.bowler } })))
    return res.status(201).send({
        "nodes": playerNodes,
        "edges": playerEdges
    })
})

router.get('/list', function(req, res, next) {
  //res.send('respond with a resource');
  var players = JSON.parse(fs.readFileSync('data/cleaned_info/playerList.json'));
  return res.status(201).send(players);
});

router.get('/team/:team', function(req, res, next) {
    var players = JSON.parse(fs.readFileSync('data/cleaned_info/players.json'));
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
    var result = []
    var teamName = teamNameDict[req.params.team]
    for (var player in players) {
        //console.log(player);
        //console.log(player["team"])
        if (players[player]["team"] == teamName) {
            result.push({
                "id": parseInt(player),
                "name": players[player]["name"],
                "team": teamName
            })
        }
    }
    return res.status(201).send(result);
})

module.exports = router;
