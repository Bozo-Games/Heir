function processLaws(fromGP, toGP) {
    for(var law in allLaws) {
        if(law.shouldProcessEffect() ) {
            law.proccessEffect();
        }
    }
    //now that all laws have been proceesed effect state change
    myKingdom.gamePhase = toGP;
    db.updateKingdom(myKingdom);

}
