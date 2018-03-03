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
    var balls = JSON.parse(fs.readFileSync('data/cleaned_info/allBalls.json'))
    var batsmanDictionary = {}
    for (var i = 0; i < balls.length; i++) {
        var batsman = balls[i].batsman;
        var bowler = balls[i].bowler;
        if (batsmanDictionary[batsman.toString()] == null) {
            batsmanDictionary[batsman.toString()] = [];
        }
        if (!batsmanDictionary[batsman.toString()].includes(bowler)) {
            batsmanDictionary[batsman.toString()].push(bowler);
        }
    }
    var playerEdges = [];
    for (var key in batsmanDictionary) {
        batsmanDictionary[key].forEach(function(d) {
            playerEdges.push({ "batsman": parseInt(key), "bowler": d })
        })
    }

    var teams = Array.from(new Set(playerNodes.map(function(d) { return d.team; })))
    var letterOrder = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    playerNodes.sort(function(a, b) {
        if (a.team == b.team) {
            var aName = a.name.split(" ");
            var aLastName = aName[aName.length - 1];
            var bName = b.name.split(" ");
            var bLastName = bName[bName.length - 1];
            return letterOrder.indexOf(bLastName.charAt(0)) - letterOrder.indexOf(aLastName.charAt(0));
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
