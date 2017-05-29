var allLaws = [];

var randomStart = new Law({name:'random start law'});
randomStart.shouldProccessEffect = function () {
    if(myKingdom.gamePhase == STATIC.gamePhase.newGame && iAmHost) {
         return true;
    } else {
        return false;
    }
};
randomStart.effect = function () {
    for(var f in db.factions) {
        var faction = db.factions[f];
        if (!faction.leader) {
            var c = findRandomCharacterIDNotAsignedToFaction();
            var character = db.characters[c];
            faction.leader = character;
            character.factionLoyalty = STATIC.factionLoyalties.leader;
        }
        if (!faction.heir) {
            var c = findRandomCharacterIDNotAsignedToFaction();
            var character = db.characters[c];
            faction.heir = character;
            character.factionLoyalty = STATIC.factionLoyalties.heir;
        }
    }
    db.batchUpdateFactions();
    db.batchUpdateCharacters();
};
allLaws.push(randomStart);



