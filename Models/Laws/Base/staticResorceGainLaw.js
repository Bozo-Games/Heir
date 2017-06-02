
var staticResourceGainLaw = new Law({name:'random king select', isActive:true});
randomKingSelect.shouldProcessEffect = function () {
	if(myKingdom) {
		if(myKingdom.gamePhase == STATIC.gamePhase.newGame && iAmHost ) {
			return true;
		} else {
			return false;
		}
	}
};
randomKingSelect.effect = function () {
	var toBeRemoved = {};
	for(var f in db.factions) {
		var faction = db.factions[f];
		if (faction.playerID) {
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
		} else { //this faction was not selected so lets remove these
			toBeRemoved.push(faction);
		}
	}
	db.batchUpdateFactions();
	db.batchUpdateCharacters();
	for(var f in toBeRemoved) {
		var faction = toBeRemoved[f];
		db.removeFaction(faction);
	}
	TVinitalKingSelectViewSettings.flavorText = "Random Start to a new Kingdom, who shall be king first.";
	TVinitalKingSelectViewSettings.animationCase = STATIC.initialKingSelectLaws.randomKingSelect;
};
allLaws.push(randomKingSelect);
//-------------------------------------------------------------------------------------------- TV Animations
