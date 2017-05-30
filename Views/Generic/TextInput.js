function TextInput() {
    View.call(this);
    this.text = "";
    this.font =  {
        font:'Helvetica',
        size:12,
        color:'#000000',
        style:NORMAL,
        alignment:LEFT
    };
    this.border.width = 1;
    this.padding = 4;
    this.isFirstResponder = true; //are we typing here
    this.editIndex = 0;
}
TextInput.prototype = Object.create(View.prototype);

TextInput.prototype.draw = function() {
    View.prototype.draw.call(this);
    push();
    var dw = this.drawWindow();
    textAlign(this.font.alignment);
    textFont(this.font.font);
    textSize(this.font.size);
    textStyle(this.font.style);
    fill(this.font.color);
    noStroke();
    text(this.text,dw.x + this.padding,dw.y + (dw.h - this.font.size) / 2,dw.w,dw.h);

    strokeWeight(2);
    stroke('#000000');
    var d = new Date();
    var secondish = d.getTime() % 500;
    if (secondish > 200 && this.isFirstResponder) {
        var upToEdit = this.text.substring(0,this.editIndex);
        var offset = textWidth(upToEdit) + 4;
        line(dw.x + offset,dw.y + 4 ,dw.x + offset, dw.y + dw.h - 4);
    }
    pop();
}

TextInput.prototype.keyPressed = function () {
    View.prototype.keyPressed.call(this);
    if (this.isFirstResponder) {
        console.log(keyCode);

    }
}
TextInput.prototype.keyReleased = function () {
    View.prototype.keyReleased.call(this);
    if (this.isFirstResponder) {
        if(keyCode == 8 ) {
            if (this.editIndex > 0) {
                this.text = this.text.substring(0, this.editIndex-1) + this.text.substring(this.editIndex,this.text.length);
                this.editIndex--;
            }
        } else if (keyCode == 37) {
            if (this.editIndex > 0) {
                this.editIndex--;
            }
        } else if (keyCode == 39) {
            if (this.editIndex < this.text.length) {
                this.editIndex++;
            }
        } else if ([9,16,17,18,20,13,91].indexOf(keyCode) == - 1) {
            this.text = this.text.insert(this.editIndex,key);
            this.editIndex++;
        }

    }
}

String.prototype.insert = function (index, string) {
    if (index > 0)
        return this.substring(0, index) + string + this.substring(index, this.length);
    else
        return string + this;
};
