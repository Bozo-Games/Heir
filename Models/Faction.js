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
	cornerRadius:5
};
Faction.prototype.draw = function(cx,cy,scale) {
    push();
    fill(this.color);
    stroke(COLOR.faction.borderColor);
    strokeWeight(2);
	var s =  scale*factionDrawSettings.defaultScale;
    rect( x - s / 2,y - s  /2,s,s,factionDrawSettings.cornerRadius);
    var resouceKeys = allResourceTypes();
    noStroke();
    for (var i = 0; i < resouceKeys.length; i++ ) {
        var key = resouceKeys[i];
        fill(COLOR.resources[key]);
        rect(x+4,y+96 - (i+1)*5,50 * (this.resourses[key] / SETTINGS.resources.max),5);
    }
    pop();
};