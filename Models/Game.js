var gamePhases = {
    newGame: 0,
    questBuilding: 1,
    questSelect:2,
    resourceBid:3,
    questSimulate:4,
    KingGivesOutReward:5
}
function Game() {
    this.phase = gamePhases.newGame;
    this.players = [];
}