function Kingdom(json) {
    this.udid = null;
    this.hostID  = null;
    this.name = 'No Name Kingdom';
    this.gameVersion = version;
    this.gamePhase = STATIC.gamePhase.newGame;
    this.loadJSON(json);
}
Kingdom.prototype.loadJSON = function(json) {
    if(json != undefined) {
        this.udid = (json.id == undefined) ? null : json.id;
        this.hostID = (json.hostID == undefined) ? null : json.hostID;;
        this.name = json.name;
        this.gamePhase =  (json.gamePhase != undefined) ? json.gamePhase : this.gamePhase;
        this.gameVersion = (json.gameVersion != undefined) ? json.gameVersion : this.gameVersion;
    }
};
Kingdom.prototype.buildJSON = function (){
    return {
        id:this.udid,
        name:this.name,
        gamePhase:this.gamePhase,
        gameVersion:this.gameVersion
    }
};