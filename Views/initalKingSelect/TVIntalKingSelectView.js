var TVinitalKingSelectViewSettings = {
  flavorText:"defualt flavor text for king selection.",
  animationCase: STATIC.initialKingSelectLaws.randomStart,
  loop: undefined
};
function renderTVinitialKingSelect(){
  switch (TVinitalKingSelectViewSettings.animationCase) {
    case STATIC.initialKingSelectLaws.randomStart: //random start law
      renderTVinitialKingSelectRandomStart(); //defined by laws
      break;
    default:

  }
}
