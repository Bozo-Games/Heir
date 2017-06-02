var allLaws = [];
function processLaws(fromGP, toGP) {
  for(var l = 0; l < allLaws.length; l++) {
    var law = allLaws[l];
    if(law.shouldProcessEffect() ) {
      law.proccessEffect();
    }
  }
  //now that all laws have been proceesed effect state change
  myKingdom.gamePhase = toGP;
  db.updateKingdom(myKingdom);

}
