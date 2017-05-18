function Kingdom(json) {
    this.udid = null;
    this.gamePhase = STATIC.gamePhase.newGame;
    this.factions = {};
    this.activeLaws = {};
    this.loadJSON(json);
}
Kingdom.prototype.loadJSON = function(json) {
    this.udid = json.id;

};
Kingdom.prototype.buildJSON = function (){
    return {
        id:this.udid
    }
};