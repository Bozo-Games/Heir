var TVinitalKingSelectViewSettings = {
  flavorText:"defualt flavor text for king selection.",
  animationCase: STATIC.initialKingSelectLaws.randomKingSelect,
  loop: undefined
};
function renderTVinitialKingSelect(){
  switch (TVinitalKingSelectViewSettings.animationCase) {
    case STATIC.initialKingSelectLaws.randomKingSelect: //random start law
      renderTVinitialKingSelectrandomKingSelect(); //defined by laws
      break;
    default:

  }
}
