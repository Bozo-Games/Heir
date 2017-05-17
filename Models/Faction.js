var factionColorOptions = {
    red:'#ff0000',
    green:'#00ff00',
    blue:'#0000ff',
    yellow:'#ffff00',
    cyan:'#00ffff',
    purple:'#ff00ff',
    //noColor:'#666666'
};
function Faction() {
    this.udid = null;
    this.name = 'No Name';
    this.colorIndex = null;//factionColorOptions.noColor;

    this.leader = null;
    this.heir = null;

    this.characters = [];

    this.resourses = {
        money:0,
        manpower:0,
        tools:0
    }
}
Faction.prototype.loadJSON  = function (json) {
    this.udid = json.id;
    this.name = json.name;
    this.colorIndex = json.colorIndex;
};
Faction.prototype.buildJSON = function (){
    return {
        id:this.udid,
        name:this.name,
        colorIndex:this.colorIndex
    }
};