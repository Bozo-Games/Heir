var allViews = [];
var topFactionsView;
var userIPAddress;
var myFaction;
var myKindom;
var txt;
var assets = {
    character: {}
};
var debug; //used as global in console to handle bugs

var logInView;
function preload() {
    preloadAssets();
    db.loadFirebase();
    //db.clearAndSeedDataBase(); //TODO remove and make button so we can join game in progress

    getUserIP(function(newIP) {userIPAddress = newIP;});
}
function setup() {
    //Intalize Models

    //Canvas is Zero Layer GUIs float above
    createCanvas(windowWidth, windowHeight);
    // Create the GUI (dom elements)
    logInView = new LogInView();
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    if(logInView) {
        logInView.resizeWindow();
    }
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