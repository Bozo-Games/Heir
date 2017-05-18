function Quest(json) {
    this.udid = null;
    this.archetype = STATIC.questArchetype.underConstruction;
    var resourceKeys = allResourceTypes(); //see enums for list of resources
    this.resourceRequiremnts = {};
    for (var i = 0; i  < resourceKeys.length; i++) {
        var key = resourceKeys[i];
        this.resourceRequiremnts[key] = {
            minimum: 0,
            bonus: 0
        };
    }
    this.loadJSON(json);
}
Quest.prototype.loadJSON = function(json) {
    if (json != undefined) {
        if (json.id != undefined) {
            this.udid = json.id;
        }
    }
};
Quest.prototype.buildJSON = function (){
    return {
        id:this.udid
    }
};