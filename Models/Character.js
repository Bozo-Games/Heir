
function Character(json) {
    this.udid = null;
    this.name = 'No Name';
    this.factionLoyalty = null;
    this.stats = {
        body: 0,
        mind: 0,
        spirit: 0
    };
    this.titles  = []; //think we limit to 3 total just to keep life simple
    this.prestige = 0;
    this.img = assests.character.default;

    this.loadJSON(json);
}
Character.prototype.loadJSON = function(json) {
    this.udid = json.id;
    this.name = json.name;
    this.factionLoyalty = json.factionLoyalty;

};
Character.prototype.buildJSON = function (){
    return {
        id:this.udid,
        name:this.name,
        factionLoyalty: this.factionLoyalty
    }
};