function Label() {
    View.call(this);
    this.text = "Label";
    this.font =  {
        font:'Helvetica',
        size:12,
        color:'#000000',
        style:NORMAL,
        alignment:CENTER
    }
}
Label.prototype = Object.create(View.prototype);

Label.prototype.draw = function() {
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
