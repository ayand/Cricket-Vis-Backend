import json

games = [656399,656401,656403,656405,656407,656409,656411,656413,656415,
    656417,656421,656423,656425,656427,656429,656431,656433,656435,656437,
    656439,656441,656443,656445,656447,656449,656451,656453,656455,656457,
    656459,656461,656463,656465,656467,656469,656471,656473,656475,656477,
    656479,656481,656483,656485,656487,656489,656491,656493,656495]

inputFile = open("allBalls.json", "r")
allBalls = json.load(inputFile)

partnershipList = []

for game in games:
    gameBalls = list(filter(lambda x: x["game"] == game, allBalls))
    #print(str(len(gameBalls)) + " balls found for game " + str(game))
    battingDict = {}
    for ball in gameBalls:
        batsman = ball["batsman_name"]
        non_striker = ball["non_striker"]
        runs_scored = ball["runs_batter"]
        if batsman not in battingDict:
            battingDict[batsman] = {}
        if non_striker not in battingDict:
            battingDict[non_striker] = {}
        if non_striker not in battingDict[batsman]:
            battingDict[batsman][non_striker] = 0
        if batsman not in battingDict[non_striker]:
            battingDict[non_striker][batsman] = 0
        battingDict[batsman][non_striker] += runs_scored
    partnershipSet = set()
    for key in battingDict:
        for subkey in battingDict[key]:
            print("Key: " + key + ", Subkey: " + subkey)
            names = [key, subkey]
            names.sort()
            if (names[0], names[1]) not in partnershipSet:
                print(str(battingDict[names[0]][names[1]]))
                print(str(battingDict[names[1]][names[0]]))
                row = { "batsman_1": names[0], "batsman_2": names[1], "game": game, "score": battingDict[names[0]][names[1]] + battingDict[names[1]][names[0]] }
                partnershipList.append(row)
                partnershipSet.add((names[0], names[1]))

with open('partnerships.json', 'w') as g:
     json.dump(partnershipList, g, indent=1)
print("Done")