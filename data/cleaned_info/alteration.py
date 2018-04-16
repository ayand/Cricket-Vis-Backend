import json

inputFile = open("allBalls.json", "r")

allBalls = json.load(inputFile)

for ball in allBalls:
    if ball["batsman_name"] == "Shafiqullah" or ball["batsman_name"] == "Shafiqullah Shafiq":
        ball["batsman_name"] = "Shafiqullah Shafiq"
    if ball["non_striker"] == "Shafiqullah" or ball["non_striker"] == "Shafiqullah Shafiq":
        ball["non_striker"] = "Shafiqullah Shafiq"
    if ball["bowler_name"] == "Shafiqullah" or ball["bowler_name"] == "Shafiqullah Shafiq":
        ball["bowler_name"] = "Shafiqullah Shafiq"
    if ball["batsman_name"] == "Mahmudullah" or ball["batsman_name"] == "Mahmudullah Riyad":
        ball["batsman_name"] = "Mahmudullah Riyad"
    if ball["non_striker"] == "Mahmudullah" or ball["non_striker"] == "Mahmudullah Riyad":
        ball["non_striker"] = "Mahmudullah Riyad"
    if ball["bowler_name"] == "Mahmudullah" or ball["bowler_name"] == "Mahmudullah Riyad":
        ball["bowler_name"] = "Mahmudullah Riyad"
    if ball["batsman_name"] == "Misbah-ul-Haq" or ball["batsman_name"] == "Misbah-ul-Haq Niazi":
        ball["batsman_name"] = "Misbah-ul-Haq Niazi"
    if ball["non_striker"] == "Misbah-ul-Haq" or ball["non_striker"] == "Misbah-ul-Haq Niazi":
        ball["non_striker"] = "Misbah-ul-Haq Niazi"
    if ball["bowler_name"] == "Misbah-ul-Haq" or ball["bowler_name"] == "Misbah-ul-Haq Niazi":
        ball["bowler_name"] = "Misbah-ul-Haq Niazi"

with open("editedAllBalls.json", "w") as outputFile:
    json.dump(allBalls, outputFile, indent=1)

print("Done")
