
function Character() {
    this.udid = null;
    this.name = 'No Name';
    this.factionLoyalty = null;

    this.img = assests.character.default;
}
Character.prototype.loadJSON = function(json) {
    this.udid = json.id;
    this.name = json.name;
    this.factionLoyalty = json.factionLoyalty;

}
Character.prototype.buildJSON = function (){
    return {
        id:this.udid,
        name:this.name,
        factionLoyalty: this.factionLoyalty
    }
}