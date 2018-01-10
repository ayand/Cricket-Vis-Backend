import json

inputFile = open("allBalls.json", "r")

allBalls = json.load(inputFile)

i = 1

for ball in allBalls:
    ball['delivery_number'] = i
    i += 1

with open("allBallsWithKey.json", "w") as outputFile:
    json.dump(allBalls, outputFile, indent=1)
