function Faction(json) {
    this.udid = null;
    this.name = json.name;

    this.playerID = null;
    this.color = '#FF0000';
    this.leader = null;
    this.heir = null;
    this.champion = null;

    this.prestige = 0;

    var resouceKeys = allResourceTypes();
    this.resourses = {};
    for (var i = 0; i < resouceKeys.length; i++ ) {
        var key = resouceKeys[i];
        this.resourses[key] = 0+10*i+10;
    }
    this.loadJSON(json);
}
Faction.prototype.loadJSON  = function (json) {
    if(json != undefined) {
        this.udid = (json.id == undefined) ? null : json.id;
        this.name = json.name;
        this.colorIndex = json.colorIndex;
        this.playerID =  (json.playerID == undefined) ? null : json.playerID;
        this.color =  (json.color == undefined) ? '#888888' : json.color;

        if(json.leaderID) {
            this.leader = db.characters[json.leaderID];
        }
        if(json.heirID) {
            this.heir = db.characters[json.heirID];
        }
        if(json.championID) {
            this.champion = db.characters[json.championID];
        }
    }
};
Faction.prototype.buildJSON = function (){
    return {
        id:this.udid,
        name:this.name,
        playerID:this.playerID,
        color:this.color,
        leaderID:(this.leader == undefined) ? null : this.leader.udid,
        heirID:(this.heir == undefined) ? null : this.heir.udid,
        championID:(this.champion == undefined) ? null : this.champion.udid

    }
};
var factionDrawSettings = {
	defaultScale: 100,
	cornerRadius:5,
	leaderSize: 0.6, //is a % of the size
	heirSize: 0.4, //should be 1-leaderSize but this is here for readability
	championSize: 0.3 //again for readablity
};
Faction.prototype.draw = function(cx,cy,scale) {
  push();
  fill(this.color);
  stroke(COLOR.faction.borderColor);
  strokeWeight(2);
	var s =  scale*factionDrawSettings.defaultScale;
	var x = cx - s / 2;
	var y =  cy - s / 2;
  rect(x ,y,s,s,factionDrawSettings.cornerRadius);
	//draw leader
	var lcx = x + (s * factionDrawSettings.leaderSize / 2);
	var lcy = y + (s * factionDrawSettings.leaderSize / 2);
	if(this.leader) {
		var ls = (s * factionDrawSettings.leaderSize) / characterDrawSettings.defaultScale;
		this.leader.draw(lcx,lcy,ls);
	} else {
		imageMode(CENTER);
		var ls = s * factionDrawSettings.leaderSize;
		image(assets.icon.hiddenCharacter,lcx,lcy,ls,ls);
	}
	//draw heir
	var hcx = x + (s * factionDrawSettings.leaderSize) + ((s * factionDrawSettings.heirSize) / 2);
	var hcy = y + (s * factionDrawSettings.heirSize) + ((s * factionDrawSettings.heirSize) / 2);
	if(this.heir) {
		var hs = (s *factionDrawSettings.heirSize) / characterDrawSettings.defaultScale;
		this.heir.draw(hcx,hcy,hs);
	} else {
		imageMode(CENTER);
		var hs = s * factionDrawSettings.heirSize;
		image(assets.icon.hiddenCharacter,hcx,hcy,hs,hs);
	}
	//draw champion
	var ccx = x + (s * factionDrawSettings.leaderSize) - ((s * factionDrawSettings.championSize) / 2);
	var ccy = y + (s * factionDrawSettings.leaderSize) + ((s * factionDrawSettings.championSize) / 2);
	if(this.champion) {
		var cs = (s * factionDrawSettings.championSize) / characterDrawSettings.defaultScale;
		this.heir.draw(ccx,ccy,cs);
	} else {
		imageMode(CENTER);
		var cs = s * factionDrawSettings.championSize;
		image(assets.icon.hiddenCharacter,ccx,ccy,cs,cs);
	}
	//draw Resources
	var rx = x + (s * factionDrawSettings.leaderSize);
	var ry = y;
	var ryd =(s * factionDrawSettings.heirSize) / 4;//0 - prestige, 1 - manpower, 2 - food, 3 - coin
	imageMode(CORNERS);
	//draw presige
	image(assets.resource.prestige,rx,ry,rx+ryd,ry+ryd);
	ry += ryd;
	//manpower
	image(assets.resource.manpower,rx,ry,rx+ryd,ry+ryd);
	ry += ryd;
	//food
	image(assets.resource.food,rx,ry,rx+ryd,ry+ryd);
	ry += ryd;
	//coin
	image(assets.resource.coin,rx,ry,rx+ryd,ry+ryd);

  pop();
};