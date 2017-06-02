
var randomKingSelectLaw = new Law({name:'random king select', isActive:true});
randomKingSelectLaw.shouldProcessEffect = function () {
	if(myKingdom) {
		if(myKingdom.gamePhase == STATIC.gamePhase.newGame && iAmHost ) {
			return true;
		} else {
			return false;
		}
	}
};
randomKingSelectLaw.effect = function () {
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
allLaws.push(randomKingSelectLaw);
//-------------------------------------------------------------------------------------------- TV Animations
var randomKingSelectAnimationSettings = {
	speed:150, // low is faster
	minLoopCount: 150, //high the longer it loops for,
	stop: undefined
};
function renderTVinitialKingSelectRandomKingSelect() {
	if(TVinitalKingSelectViewSettings.loop == undefined) { //implies new animation started
		var pc = db.activePlayerCount;
		var angleDeleta = ( (2*Math.PI)) / pc;
		TVinitalKingSelectViewSettings.loop = randomKingSelectAnimationSettings.minLoopCount + getRandomInt(0,pc) * angleDeleta;
		TVinitalKingSelectViewSettings.stop =  getRandomInt(0,pc) * angleDeleta
	} else {
		if(TVinitalKingSelectViewSettings.loop <= 0) {
			//TVinitalKingSelectViewSettings.loop = randomKingSelectAnimationSettings.minLoopCount;
		} else {
			TVinitalKingSelectViewSettings.loop--;
		}
		var cx = windowWidth / 2;
		var cy = windowHeight / 2;
		var angleDeleta = ( (2*Math.PI)) / db.activePlayerCount ;
		var radious = (windowWidth - cx) * 0.75;
		var factionAngle = 0;
		var crownAngle =  (2*Math.PI) * ((TVinitalKingSelectViewSettings.loop%randomKingSelectAnimationSettings.speed) / randomKingSelectAnimationSettings.speed);
		for(var f in db.factions) {
			var faction = db.factions[f];
			if(faction.playerID) {
				var pos = locationOnCircle(cx, cy, radious, factionAngle);

				var a = Math.abs(Math.abs(crownAngle - factionAngle) - Math.PI);
				var factionsScale = 1 + (a / Math.PI );
				faction.draw(pos.x, pos.y, factionsScale);
				factionAngle += angleDeleta;
			}
		}
		radious = (windowWidth - cx) * 0.6;
		var pos = locationOnCircle(cx,cy,radious,crownAngle);
		imageMode(CENTER);
		image(assets.icon.king,pos.x,pos.y,50,50);
	}
}