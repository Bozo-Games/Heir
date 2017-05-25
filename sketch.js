var allViews = [];
var topFactionsView;

var myFaction;
var myKindom;
var txt;
var assets = {
    character: {}
}
function preload() {
    preloadAssets();
    db.loadFirebase();
    db.clearAndSeedDataBase(); //TODO remove and make button so we can join game in progress
}
function setup() {
    //Intalize Models

    //Canvas is Zero Layer GUIs float above
    createCanvas(windowWidth, windowHeight);
    // Create the GUI (dom elements)
    txt = createDiv('This is an HTML string!');
    txt.position(50, 50);
    var col = color(255,255,255,255);
    txt.style("background-color", col);
    //loadColors();

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
    var x = 50;
    var factionKeys = Object.keys(db.factions) ;
    for (var i = factionKeys.length-1; i >= 0; i--) {
        db.factions[factionKeys[i]].draw(x,50);
        x += 110;
    }
    var y = 250;
    var characterKeys = Object.keys(db.characters);
    for (var i = characterKeys.length-1; i >= 0; i--) {
        db.characters[characterKeys[i]].draw(75,y);
        y += 110;
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
    txt.position(mouseX,mouseY);
    for (var i = 0; i < allViews.length; i++ ) {
        allViews[i].mouseClicked();
    }
}