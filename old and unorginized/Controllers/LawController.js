var allLaws = [];
function processLaws(fromGP, toGP) {
  for(var l = 0; l < allLaws.length; l++) {
    var law = allLaws[l];
	  print(law.name);
	  print(law.shouldProcessEffect())
    if(law.shouldProcessEffect() ) {
      law.processEffect();
    }
  }
  //now that all laws have been proceesed effect state change
  myKingdom.gamePhase = toGP;
  db.updateKingdom(myKingdom);

}
