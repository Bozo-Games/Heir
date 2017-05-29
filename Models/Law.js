function Law(json) {
    this.udid = null;
    this.name = "";
    this.shouldProccessEffect = function () {
        return false;
    };
    this.effect = function() {
        print('WARNING: Empty Law effect called - '+this.name);
    };
    this.loadJSON(json);
}
Law.prototype.loadJSON = function(json) {
    if(json) {
        this.udid = (json.id == undefined) ? null : json.id;
        this.name = json.name;
    }
};
Law.prototype.buildJSON = function (){
    return {
        id:this.udid,
        name:this.name
    }
};