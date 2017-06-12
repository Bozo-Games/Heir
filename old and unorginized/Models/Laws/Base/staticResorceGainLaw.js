
var staticResourceGainLaw = new Law({name:'static resource gain', isActive:true});
staticResourceGainLaw.shouldProcessEffect = function () {
	if(myKingdom) {
		return false;
	}
};
staticResourceGainLaw.effect = function () {

};
allLaws.push(staticResourceGainLaw);
//-------------------------------------------------------------------------------------------- TV Animations
