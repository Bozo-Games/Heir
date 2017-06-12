function Title(json) {
    this.udid = null;

    this.loadJSON(json);
}
Title.prototype.loadJSON = function(json) {
    this.udid = json.id;

};
Title.prototype.buildJSON = function (){
    return {
        id:this.udid
    }
};