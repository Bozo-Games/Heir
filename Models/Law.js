function Law(json) {
    this.udid = null;

    this.loadJSON(json);
}
Law.prototype.loadJSON = function(json) {
    this.udid = json.id;

};
Law.prototype.buildJSON = function (){
    return {
        id:this.udid
    }
};