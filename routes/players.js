var express = require('express');
var router = express.Router();
var fs = require('file-system');
var d3 = require('d3');

router.get('/', function(req, res, next) {
  var players = JSON.parse(fs.readFileSync('data/cleaned_info/players.json'));
  return res.status(201).send(players);
});

router.get('/graph', function(req, res, next) {
    var playerNodes = JSON.parse(fs.readFileSync('data/cleaned_info/playerList.json'));
    var balls = JSON.parse(fs.readFileSync('data/cleaned_info/allBalls.json'))
    var playerEdges = [];

    var playerComboStats = d3.nest()
        .key(function(d) { return d.batsman; })
        .key(function(d) { return d.bowler; })
        .rollup(function(leaves) {
            return {
                "number_of_balls": leaves.length,
                "runs_scored": d3.sum(leaves, function(d) {
                    return (d.extras_type != "Wd" && d.extras_type != "Nb") ? d.runs_batter : 0;
                })
            }
        })
        .entries(balls);

    playerComboStats.forEach(function(batsman) {
        var batsmanID = parseInt(batsman.key)
        batsman.values.forEach(function(bowler) {
            var bowlerID = parseInt(bowler.key);
            var numberOfBalls = bowler.value.number_of_balls;
            var runsScored = bowler.value.runs_scored;
            playerEdges.push({
                "batsman": batsmanID,
                "bowler": bowlerID,
                "number_of_balls": numberOfBalls,
                "runs_scored": runsScored
            })
        })
    })
    var teams = Array.from(new Set(playerNodes.map(function(d) { return d.team; })))
    var letterOrder = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    playerNodes.sort(function(a, b) {
        if (a.team == b.team) {
            var aName = a.name.split(" ");
            var aLastName = aName[aName.length - 1];
            var aFirst = aName[0].charAt(0);
            var bName = b.name.split(" ");
            var bLastName = bName[bName.length - 1];
            var bFirst = bName[0].charAt(0)
            if (bLastName == aLastName) {
                return letterOrder.indexOf(aFirst) - letterOrder.indexOf(bFirst);
            }
            return ((aLastName > bLastName) ? 1 : -1)
            //return letterOrder.indexOf(bLastName.charAt(0)) - letterOrder.indexOf(aLastName.charAt(0));
        }
        return teams.indexOf(a.team) - teams.indexOf(b.team);
    })
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
