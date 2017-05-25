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
    this.img = "army";

    this.loadJSON(json);
}
Character.prototype.loadJSON = function(json) {
    if(json != undefined) {
        this.udid = (json.id == undefined) ? null : json.id;
        this.name = json.name;

    }
};
Character.prototype.buildJSON = function (){
    return {
        id:this.udid,
        name:this.name
    }
};
Character.prototype.draw = function(x,y) {
    push();
    fill(color(255,255,255));
    strokeWeight(2);
    if (this.factionLoyalty != null) {
        stroke(this.factionLoyalty.color);
    } else {
        stroke('#666666');
    }
    ellipse(x,y,100,100);
    imageMode(CENTER);
    image(assests.character[this.img],x,y,50,50);
    pop();
};