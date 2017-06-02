var TVinitalKingSelectViewSettings = {
  flavorText:"defualt flavor text for king selection.",
  animationCase: 0, //implies default
  loop: undefined
};
function renderTVinialKingSelect(){
  switch (TVinitalKingSelectViewSettings.animationCase) {
    case 0: //random start law
      renderTVinialKingSelectRandomStart();
      break;
    default:

  }

}
function renderTVinialKingSelectRandomStart() {
  if(TVinitalKingSelectViewSettings.loop == undefined) { //implies new animation started
    TVinitalKingSelectViewSettings.loop = 500;
  } else {
    TVinitalKingSelectViewSettings.loop--;

    if(TVinitalKingSelectViewSettings.loop <= 0) {
        //TVinitalKingSelectViewSettings.loop = 500;
    } else {
        var cx = windowWidth / 2;
        var cy = windowHeight / 2;
        var angleDeleta = (2*Math.PI) / Object.keys(db.factions).count;

        var radious = (windowHeight - cy) * 0.75;
        var factionAngle = 1.0;
        var crownAngle = Math.PI * ((TVinitalKingSelectViewSettings.loop % 150) / 75);
        print(crownAngle);
        for(var f in db.factions) {
            debug = crownAngle + " - " + factionAngle + " / "  + "2Pi = " + factionsScale;
            var faction = db.factions[f];
            var pos = locationOnCircle(cx,cy,radious,factionAngle);
            var factionsScale = 1 + (1 - Math.abs(crownAngle - factionAngle)/(2*Math.PI));
            faction.draw(pos.x,pos.y,factionsScale);
            factionAngle += angleDeleta;
        }
        radious = (windowHeight - cy) * 0.6;
        var pos = locationOnCircle(cx,cy,radious,crownAngle);
        image(assets.icon.king,pos.x,pos.y,50,50);
    }
  }
}
