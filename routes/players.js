var express = require('express');
var router = express.Router();
var fs = require('file-system');

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  var players = JSON.parse(fs.readFileSync('data/cleaned_info/players.json'));
  return res.status(201).send(players);
});

module.exports = router;
