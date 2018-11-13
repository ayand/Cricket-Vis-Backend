var express = require('express');
var router = express.Router();
var fs = require('file-system');
var d3 = require('d3');

router.get('/', function(req, res, next) {
  var balls = JSON.parse(fs.readFileSync('data/cleaned_info/allBallsWithKey.json'));
  console.log(req.query.leftX)
  var leftX = parseFloat(req.query.leftX);
  var rightX = parseFloat(req.query.rightX);
  var topY = parseFloat(req.query.topY);
  var bottomY = parseFloat(req.query.bottomY);
  var xName = req.query.xName;
  var yName = req.query.yName;
  console.log(leftX)
  console.log(rightX)
  console.log(topY)
  console.log(bottomY)
  var result = balls.filter(function(d) {

      var condition1 = d[xName] >= leftX && d[xName] <= rightX;
      /*if (condition1) {
          console.log("CORRECT X: " + d[xName])
      }*/
      var condition2 = d[yName] >= topY && d[yName] <= bottomY;
      //console.log(d[yName])
      if (!condition2) {
          console.log("INCORRECT Y: " + d[yName])
      }
      return condition1 && condition2;
  });
  return res.status(201).send(result);
})

module.exports = router;
