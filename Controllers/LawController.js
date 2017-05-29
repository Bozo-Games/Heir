function processLaws(fromGP, toGP) {
    for(var i = 0; i < allLaws.length; i++) {
        var law = allLaws[i];
        print(i);
        print(law);
        if(law.shouldProcessEffect()) {
            law.proccessEffect();
        }
    }
    myKingdom.gamePhase = toGP;
    db.updateKingdom(myKingdom);
}