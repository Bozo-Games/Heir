var version = "0.0.2";

var iAmHost = false;
var myFaction = undefined;
var hostID = undefined;
var iAmTV = false;
var iAmPlayer = false;
var myID = undefined;

var userLocalID; //could be tv could be player not sure until game starts
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

}
function setup() {
    //Intalize Models
    db.addListener('kingdoms',KingdomController);
    //Canvas is Zero Layer GUIs float above
    createCanvas(windowWidth, windowHeight);
    // Create the GUI (dom elements)
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
    if (iAmHost) {

    }
    background(0); //clears previous drawing on canvas
    if (iAmTV) {
        renderTVView();
    } else if (iAmPlayer) {
        renderPlayerView();
    } else { //
        renderLogInView();
    }
    //currentView.draw();
    debugDiv.html(debug);
}
function keyTyped() {

}
function keyPressed() {
    return false;
}
function keyReleased() {
    return false;
}

function mouseClicked() {
}

// ------------------------------------------------------------------------------------------------ Render functions
// ------------------------------------------------------------------------------------------------ Render functions
function renderLogInView() {
    if (logInView) {
        showLogInTimeOut--;
    } else {
        logInView = new LogInView();
    }

    if (myKingdom) {
        if (myKingdom.gamePhase != STATIC.gamePhase.newGame && logInView && showLogInTimeOut < 0) {
            logInView.destroy();
            logInView = undefined;
        }
        if(iAmHost) {
            fill(color(255,255,255));
            rect(100,100,100,100);
        }
    }

}
// ------------------------------------------------------------------------------------------------ TV Render functions
function renderTVView() {

}
// ------------------------------------------------------------------------------------------------ player Render functions
function renderPlayerView() {

}