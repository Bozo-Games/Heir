function createFactionView() {
    View.call(this);
    this.setWindow(0.1,0.1,0.8,0.8);

    var titleLabel = new Label();
    titleLabel.font.size = 24;
    titleLabel.text = 'Select Your Faction'
    titleLabel.setWindow(0,0,1,0.1);

    this.children.push(titleLabel);

    var clearServerBtn = new Button();
    clearServerBtn.setWindow(0.1,0.8,0.2,0.1);
    clearServerBtn.color = '#880000';
    clearServerBtn.text = 'Clear Factions';
    this.children.push(clearServerBtn);
    clearServerBtn.mouseClicked = function () {
        var dw = this.drawWindow();
        if (mouseX >= dw.x && mouseX <= dw.w + dw.x && mouseY >= dw.y && mouseY <= dw.y+dw.h) {
            alert("cleared server");
        }
    };
    var joinBtn = new Button();
    joinBtn.setWindow(0.7,0.8,0.2,0.1);
    joinBtn.text = 'Join Game';
    this.children.push(joinBtn);
    joinBtn.color = '#008800';
    joinBtn.mouseClicked = function () {
        var dw = this.drawWindow();
        if (mouseX >= dw.x && mouseX <= dw.w + dw.x && mouseY >= dw.y && mouseY <= dw.y+dw.h) {
            myFaction = new Faction();
            myFaction.name = this.parent.nameInput.text;
            myFaction.colorIndex = this.parent.selectedColorKey;
            FC.createFaction(myFaction);
        }
    };

    this.nameInput = new TextInput();
    this.nameInput.border.width = 1;
    this.nameInput.setWindow(0.05,0.2,0.4,0.05);
    this.children.push(this.nameInput);

    var nameLbl = new Label();
    nameLbl.setWindow(0.05,0.15,0.4,0.05);
    nameLbl.text = "Faction Name";
    this.children.push(nameLbl);

    var keys = [];
    for(var k in factionColorOptions) keys.push(k);
    this.colorOptionViews = [];
    this.selectedColorKey = null;
    var xx = 0;
    var yy = 0;
    for(var i = 0; i < keys.length; i++) {
        var colorOptionView = new View();
        colorOptionView.setWindow(0.5+xx,0.2+yy,0.125,0.1);
        colorOptionView.color = factionColorOptions[keys[i]];
        colorOptionView.border.width = 2;
        colorOptionView.border.color = 1;
        colorOptionView.factionColorKey = keys[i];
        colorOptionView.mouseClicked = function() {
            if(View.prototype.mouseInView.call(this)) {
                print('here with '+ this.factionColorKey);
                if (this.parent.selectedColorKey == this.factionColorKey) {
                    this.parent.selectedColorKey = null;
                    this.border.color = '#000000';
                    this.border.width = 2;
                } else if (this.parent.selectedColorKey == null) {
                    this.parent.selectedColorKey = this.factionColorKey;
                    this.border.color = '#ffaa00';
                    this.border.width = 5;
                }
            }
        }

        this.colorOptionViews.push(colorOptionView);
        this.children.push(colorOptionView);
        xx += 0.04166 + 0.125;
        if (xx >= 0.4) {
            yy += 0.11;
            xx = 0
        }
    }
}
createFactionView.prototype = Object.create(View.prototype);