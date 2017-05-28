var version = "0.0.2";

var allViews = [];
var topFactionsView;
var userLocalID;
var myFaction;
var txt;
var assets = {
    character: {}
};
var debug = "Debug 4"; //used as global in console to handle bugs
var debugDiv;
var logInView;

function preload() {
    var loaclVerssion =  localStorage.getItem("version");
    if(loaclVerssion == version) {
        print('versions match ' + version);
        userLocalID = localStorage.getItem('userID');
        localStorage.setItem('version',version);
    } else {
        print('hard reload');
        localStorage.setItem('version',version);
        location.reload(true);
    }
    if(userLocalID == undefined) {
        userLocalID = buildUserID();
    }
    localStorage.setItem('userID',userLocalID);
    preloadAssets();
    db.loadFirebase();
    //db.clearAndSeedDataBase(); //TODO remove and make button so we can join game in progress

}
function setup() {
    //Intalize Models
    db.addListener('kingdoms',KingdomController);
    //Canvas is Zero Layer GUIs float above
    createCanvas(windowWidth, windowHeight);
    // Create the GUI (dom elements)
    logInView = new LogInView();
    debugDiv = createP("Debug");
    debugDiv.class('debugDiv');
    debugDiv.position(0,0);
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
    debugDiv.html(debug);
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