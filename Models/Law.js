function Law(json) {
    this.udid = null;
    this.name = "";
    this.isActive = true;
    this.shouldProcessEffect = function () {
        return false;
    };
    this.proccessEffect = function() {
        print('WARNING: Empty Law effect called - '+this.name);
    };
    this.loadJSON(json);
}
Law.prototype.loadJSON = function(json) {
    console.log('load json called');
    if(json) {
        this.udid = (json.id == undefined) ? null : json.id;
        this.name = json.name;
        this.isActive = json.isActive;
    }
};
Law.prototype.buildJSON = function (){
    return {
        id:this.udid,
        name:this.name,
        isActive:this.isActive
    }
};