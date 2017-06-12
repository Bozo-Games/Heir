
var assets;
function preloadAssets() {
    assets = {
        character: {},
        icon: {},
	    resource: {}
    };
    //Character Images
    assets.character['default'] = loadImage('Assets/Characters/blank-character.png');
    //assests.character['army'] = loadImage('Assets/Characters/army_organiser.dds');
	assets.character['army'] = loadImage('Assets/Characters/army_organiser.png');

	// -------------------------------------------------------------------------------------------- load Icons
	assets.icon.hiddenCharacter = loadImage('Assets/Icons/HiddenCharacter.png');
	assets.icon.king = loadImage('Assets/Icons/King.png');
	// -------------------------------------------------------------------------------------------- load Resources
	assets.resource.prestige = loadImage('Assets/Resources/prestige.png');
	assets.resource.food = loadImage('Assets/Resources/food.png');
	assets.resource.manpower = loadImage('Assets/Resources/manpower.png');
	assets.resource.coin = loadImage('Assets/Resources/coin.png');
	// -------------------------------------------------------------------------------------------- load titles


}
