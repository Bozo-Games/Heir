var allViews = [];
var topFactionsView;

var myFaction;
var myKindom;
var text;
var assests = {
    character: {}
}
function preload() {
    //Character Images
    assests.character['default'] = loadImage('Assets/Characters/blank-character.png');
}
function setup() {
    db.loadFirebase();
    //Intalize Models

    //Canvas is Zero Layer GUIs float above
    createCanvas(windowWidth, windowHeight);
    // Create the GUI (dom elements)
    text = createDiv('This is an HTML string!');
    text.position(50, 50);
    var col = color(255,255,255,255);
    text.style("background-color", col);

/*
    var factionCreate = new createFactionView();
    allViews.push(factionCreate);
    topFactionsView = new factionsView();
    allViews.push(topFactionsView);*/
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function draw() {

    background(0);

    for (var i = allViews.length-1; i >= 0; i--) {
        allViews[i].draw();
    }
    //currentView.draw();
}

function keyTyped() {
}
function keyPressed() {
    for (var i = allViews.length-1; i >= 0; i--) {
        allViews[i].keyPressed();
    }
    return false;
}
function keyReleased() {
    for (var i = allViews.length-1; i >= 0; i--) {
        allViews[i].keyReleased();
    }
    return false;
}

function mouseClicked() {
    text.position(mouseX,mouseY);
    for (var i = 0; i < allViews.length; i++ ) {
        allViews[i].mouseClicked();
    }
}