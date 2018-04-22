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
    if ball["batsman_name"] == "Francois du Plessis":
        ball["batsman_name"] = "Faf du Plessis"
    if ball["non_striker"] == "Francois du Plessis":
        ball["non_striker"] = "Faf du Plessis"
    if ball["batsman_name"] == "Grant Elliot":
        ball["batsman_name"] = "Grant Elliott"
    if ball["non_striker"] == "Grant Elliot":
        ball["non_striker"] = "Grant Elliott"
    if ball["batsman_name"] == "Steve Smith":
        ball["batsman_name"] = "Steven Smith"
    if ball["non_striker"] == "Steve Smith":
        ball["non_striker"] = "Steven Smith"
    if ball["batsman_name"] == "Mohammad Mahmudullah":
        ball["batsman_name"] = "Mahmudullah Riyad"
    if ball["non_striker"] == "Mohammad Mahmudullah":
        ball["non_striker"] = "Mahmudullah Riyad"
    if ball["batsman_name"] == "Andrew Balbirnie":
        ball["batsman_name"] = "Andy Balbirnie"
    if ball["non_striker"] == "Andrew Balbirnie":
        ball["non_striker"] = "Andy Balbirnie"
    if ball["batsman_name"] == "Krishna Karate":
        ball["batsman_name"] = "Krishna Chandran"
    if ball["non_striker"] == "Krishna Karate":
        ball["non_striker"] = "Krishna Chandran"
    if ball["batsman_name"] == "JP Duminy":
        ball["batsman_name"] = "Jean-Paul Duminy"
    if ball["non_striker"] == "JP Duminy":
        ball["non_striker"] = "Jean-Paul Duminy"
    if ball["batsman_name"] == "Andrew McBrine":
        ball["batsman_name"] = "Andy McBrine"
    if ball["non_striker"] == "Andrew McBrine":
        ball["non_striker"] = "Andy McBrine"


with open("editedAllBalls.json", "w") as outputFile:
    json.dump(allBalls, outputFile, indent=1)

print("Done")
