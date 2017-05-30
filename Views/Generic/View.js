function View () {
    this.x = 0;
    this.y = 0;
    this.w = 1;
    this.h = 1;
    this.color = '#ffffff';
    this.alpha = 1.0;
    this.border = {color:'#000000', width:0}
    this.parent = null;
    this.children = [];
}
View.prototype.setWindow = function (x,y,w,h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
}
View.prototype.drawWindow = function() {
    if (this.parent == null) {
        return {
            x:0 + (windowWidth * this.x),
            y:0 + (windowHeight * this.y),
            w:windowWidth * this.w,
            h:windowHeight * this.h
        };
    } else {
        var pdw = this.parent.drawWindow();
        return {
            x:pdw.x + this.x * pdw.w ,
            y:pdw.y + this.y * pdw.h,
            w:this.w * pdw.w,
            h:this.h * pdw.h
        };
    }
}
View.prototype.draw = function() {
    push(); //pushes new draw pen to stack
    strokeWeight(this.border.width);
    if(this.border.width == 0) {
        noStroke();
    } else {
        stroke(this.border.color);
    }
    var c = color(this.color);
    c = color(c.levels[0], c.levels[1], c.levels[2],this.alpha*255);
    fill(c);
    var drawWindow = this.drawWindow();
    rect(drawWindow.x,drawWindow.y,drawWindow.w,drawWindow.h, 0);
    for (var i = 0; i < this.children.length; i++) {
        this.children[i].parent = this;
        this.children[i].draw();
    }
    pop(); // pops draw things
}
View.prototype.mouseInView = function() {
    var dw = this.drawWindow();
    return (mouseX >= dw.x && mouseX <= dw.w + dw.x && mouseY >= dw.y && mouseY <= dw.y+dw.h)
}
View.prototype.mouseClicked = function () {
    if (this.mouseInView()) {
        //interaction herefor (var i = 0; i < this.children.length; i++) {
        for (var i = 0; i < this.children.length; i++) {
            this.children[i].parent = this;
            this.children[i].mouseClicked();
        }
    }
}
View.prototype.keyPressed = function () {
    for (var i = 0; i < this.children.length; i++) {
        this.children[i].parent = this;
        this.children[i].keyPressed();
    }
}
View.prototype.keyReleased = function () {
    for (var i = 0; i < this.children.length; i++) {
        this.children[i].parent = this;
        this.children[i].keyReleased();
    }
}