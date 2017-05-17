function characterView() {
    View.call(this);
    this.setWindow(0,0,0.05,0.5);
    this.img = assests.character.default;
    this.character = null;
}
characterView.prototype = Object.create(View.prototype);
characterView.prototype.setCharacter = function(character) {
    this.character = character;
};
characterView.prototype.draw = function () {
    View.prototype.draw.call(this);
    var dw = this.drawWindow();
    push();
    image(this.character.img,dw.x,dw.y,dw.w,dw.h);
    pop();
};