var version = "0.0.2";

var allViews = [];
var topFactionsView;
var userLocalID;
var myFaction;
var txt;
var assets = {
    character: {}
};
var onTV = {
    factions: {},
    characters: {}
};
var showLogInTimeOut = 500;
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
    if(logInView) {
        showLogInTimeOut --;
    }
    if(myKingdom) {
        if(myKingdom.gamePhase != STATIC.gamePhase.newGame && logInView && showLogInTimeOut < 0) {
            logInView.destroy();
            logInView = undefined;
            if(myFaction) {

            } else { //we are in game as TV
                onTV.factions = {};
                for(var f in db.factions) {
                    var faction = db.factions[f];
                    if (faction.playerCookieID ) {
                        onTV.factions[f] = faction;
                        if (!faction.leader) {

                        }
                    }
                }
            }
        }
    }
    background(0);
    for(var f in onTV.factions) {
        var faction = db.factions[f];
        var dx = 10;
        faction.draw(0,0);
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