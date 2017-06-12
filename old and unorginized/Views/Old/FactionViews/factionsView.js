function factionsView() {
    View.call(this);
    this.setWindow(0.15,0,0.7,0.1);
    this.alpha = 0.5;
};
factionsView.prototype = Object.create(View.prototype);
factionsView.prototype.draw = function () {
    View.prototype.draw.call(this);
    for (var i = 0; i < FC.allFactions.length; i++) {

    }
};
factionsView.prototype.update = function() {
    this.children = [];

    var keys = Object.keys(FC.allFactions);

    for (var i = 0; i < keys.length; i++) {
        print('here');
        var cv = new characterView();
        cv.character = new Character();
        this.children.push(cv);
    }
}
