var allViews = [];
var topFactionsView;

var myFaction;
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

    // Create the GUI

    createCanvas(windowWidth, windowHeight);
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
    for (var i = 0; i < allViews.length; i++ ) {
        allViews[i].mouseClicked();
    }
}