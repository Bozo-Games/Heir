var TVinitalKingSelectViewSettings = {
  flavorText:"defualt flavor text for king selection.",
  animationCase: 0, //implies default
  loop: undefined,
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

    } else {
        var cx = windowWidth / 2;
        var cy = windowHeight / 2;
        var angleDeleta = (2*Math.PI) / db.factions.length;
        var radious = (windowWidth - cx) * 0.75;
        var factionAngle = 0;
        var animationAgnle = 0;
        var i =0;
        for(var f in db.factions) {
            var faction = db.factions[f];
            var dx = cx + Math.sqrt(Math.pow(radious,2) - Math.pow(radious*Math.sin(factionAngle),2));
            var dy = cy + Math.sqrt(Math.pow(radious,2) - Math.pow(radious*Math.cos(factionAngle),2));
            if (angle > Math.PI) {
                dy = cy - Math.sqrt(Math.pow(radious,2) - Math.pow(radious*Math.cos(factionAngle),2));
            }
            faction.draw(dx,dy);
            factionAngle += angleDeleta;
            i++;
        }
    }
  }
}
