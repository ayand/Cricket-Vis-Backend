import json

def partnershipOrdering(a, b):
    if a["game"] == b["game"]:
        return a["position"] - b["position"]
    return a["game"] - b["game"]

games = [656399,656401,656403,656405,656407,656409,656411,656413,656415,
    656417,656421,656423,656425,656427,656429,656431,656433,656435,656437,
    656439,656441,656443,656445,656447,656449,656451,656453,656455,656457,
    656459,656461,656463,656465,656467,656469,656471,656473,656475,656477,
    656479,656481,656483,656485,656487,656489,656491,656493,656495]

inputFile = open("allBalls.json", "r")
allBalls = json.load(inputFile)

playerFile = open("players.json")
playerDict = json.load(playerFile)

partnershipList = []

for game in games:
    gameBalls = list(filter(lambda x: x["game"] == game, allBalls))
    #print(str(len(gameBalls)) + " balls found for game " + str(game))
    battingDict = {}
    currentTeam = None
    currentPosition = 0
    for ball in gameBalls:
        batsman = ball["batsman_name"]
        non_striker = ball["non_striker"]
        runs_scored = ball["runs_batter"]
        extra_runs = ball["extras"]
        
        if batsman not in battingDict:
            battingDict[batsman] = {}
            #print(playerDict[str(ball["batsman"])]["team"])
            battingDict[batsman]["team"] = ball["batting_team"]
            #print(str(battingDict[batsman]))
        if non_striker not in battingDict:
            battingDict[non_striker] = {}
        if non_striker not in battingDict[batsman] and batsman not in battingDict[non_striker]:
            currentPosition += 1
        if non_striker not in battingDict[batsman]:
            battingDict[batsman][non_striker] = { "score": 0, "extras": 0, "position": currentPosition }
        if batsman not in battingDict[non_striker]:
            battingDict[non_striker][batsman] = { "score": 0, "extras": 0, "position": currentPosition }
        battingDict[batsman][non_striker]["score"] += runs_scored
        battingDict[batsman][non_striker]["extras"] += extra_runs
        battingDict[batsman]["team"] = ball["batting_team"]
        battingDict[non_striker]["team"] = ball["batting_team"]
        print(str(battingDict[batsman]))
    partnershipSet = set()
    """print("Dictionary:")
    print(str(battingDict))"""
    for key in battingDict:
        for subkey in battingDict[key]:
            if subkey != "team":
                #print("Key: " + key + ", Subkey: " + subkey)
                names = [key, subkey]
                names.sort()
                if (names[0], names[1]) not in partnershipSet:
                    print(key)
                    print(str(battingDict[key]))
                    team = battingDict[key]["team"]
                    #print("Team: " + battingDict[key]["team"])
                    score = battingDict[names[0]][names[1]]["score"] \
                        + battingDict[names[1]][names[0]]["score"]\
                        + battingDict[names[0]][names[1]]["extras"]\
                        + battingDict[names[1]][names[0]]["extras"]
                    position = battingDict[names[0]][names[1]]["position"]
                    row1 = { "batsman_1": names[0],\
                            "batsman_2": names[1],\
                            "game": game,\
                            "team": team,\
                            "score": score,\
                            "batsman_1_score": battingDict[names[0]][names[1]]["score"],\
                            "batsman_2_score": battingDict[names[1]][names[0]]["score"],\
                            "position": position }
                    row2 = { "batsman_1": names[1],\
                            "batsman_2": names[0],\
                            "game": game,\
                            "team": team,\
                            "score": score,\
                            "batsman_1_score": battingDict[names[1]][names[0]]["score"],\
                            "batsman_2_score": battingDict[names[0]][names[1]]["score"],\
                            "position": position }
                    partnershipList.append(row1)
                    partnershipList.append(row2)
                    partnershipSet.add((names[0], names[1]))

partnershipList = sorted(partnershipList, cmp=partnershipOrdering)
with open('partnerships.json', 'w') as g:
     json.dump(partnershipList, g, indent=1)
print("Done")
