function processLaws(fromGP, toGP) {
    for(var law in allLaws) {
        if(law.shouldProcessEffect() ) {
            law.proccessEffect();
        }
    }
}