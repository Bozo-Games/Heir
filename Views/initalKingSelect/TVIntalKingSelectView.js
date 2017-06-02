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
