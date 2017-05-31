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
        TVinitalKingSelectViewSettings.loop = 500;
    } else {
        print('--------------------------');
        var cx = windowWidth / 2;
        var cy = windowHeight / 2;
        var angleDeleta = (2*Math.PI) / db.factions.length;
        var radious = (windowWidth - cx) * 0.75;
        var factionAngle = 0;
        var crownAngle = Math.PI * (TVinitalKingSelectViewSettings.loop / 250);
        for(var f in db.factions) {
            var faction = db.factions[f];
            var pos = locationOnCircle(cx,cy,radious,factionAngle);

            var factionsScale = 1 + (1 - Math.abs(crownAngle - factionAngle)/(Math.PI*2));
            faction.draw(pos.x,pos.y,factionsScale);

            factionAngle += angleDeleta;
        }
        radious = (windowWidth - cx) * 0.6;
        var pos = locationOnCircle(cx,cy,radious,crownAngle);
        image(assets.icon.king,pos.x,pos.y,50,50);
        debug = "angle - " + (crownAngle*57.2958) + " q = " + pos.q;
    }
  }
}
