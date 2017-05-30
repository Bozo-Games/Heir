function Button() {
    View.call(this);
    this.text = "Button";
    this.font =  {
        font:'Helvetica',
        size:12,
        color:'#000000',
        style:NORMAL,
        alignment:CENTER
    }
}
Button.prototype = Object.create(View.prototype);

Button.prototype.draw = function() {
    View.prototype.draw.call(this);
    push();
    var dw = this.drawWindow();
    textAlign(this.font.alignment);
    textFont(this.font.font);
    textSize(this.font.size);
    textStyle(this.font.style);
    fill(this.font.color);
    noStroke();
    text(this.text,dw.x,dw.y + (dw.h - this.font.size) / 2,dw.w,dw.h);

    pop();
}

Button.prototype.mouseClicked = function () {
    var dw = this.drawWindow();
    if (mouseX >= dw.x && mouseX <= dw.w + dw.x && mouseY >= dw.y && mouseY <= dw.y+dw.h) {
        //interaction herefor (var i = 0; i < this.children.length; i++) {
        alert("I was clicked");

        for (var i = 0; i < this.children.length; i++) {
            this.children[i].parent = this;
            this.children[i].mouseClicked();
        }
    }
}