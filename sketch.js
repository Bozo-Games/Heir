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
        userLocalID = localStorage.getItem('userLocalID');
        localStorage.setItem('version',version);
    } else {
        print('hard reload');
        localStorage.setItem('version',version);
        location.reload(true);
    }
    if(userLocalID == undefined) {
        userLocalID = buildUserID();
    }
    localStorage.setItem('userLocalID',userLocalID);
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

// ------------------------------------------------------------------------------------------------ TV Render functions
function renderTVView() {
  if (myKingdom) {
    switch (myKingdom.gamePhase) {
      case STATIC.gamePhase.newGame:

        break;
      case STATIC.gamePhase.initialKingSelect:
        renderTVinialKingSelect();
        break;
      case STATIC.gamePhase.questBuilding:

        break;
      case STATIC.gamePhase.questSelection:

        break;
      case STATIC.gamePhase.questSimulation:

        break;
      case STATIC.gamePhase.questResolution:

        break;
      case STATIC.gamePhase.HeirInherits:

        break;
      case STATIC.gamePhase.scoreingTheGame:

        break;
      default:
        debug = "Unkowen Kingdom state " + myKingdom.gamePhase;
    }
  }
}
// ------------------------------------------------------------------------------------------------ player Render functions
function renderPlayerView() {

}
