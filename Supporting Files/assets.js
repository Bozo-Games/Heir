
var assets = {
    character: {}
}
function preloadAssets() {
    //Character Images
    assets.character['default'] = loadImage('Assets/Characters/blank-character.png');
    //assests.character['army'] = loadImage('Assets/Characters/army_organiser.dds');
    assets.character['army'] = loadImage('Assets/Characters/army_organiser.png');
    /*
    assets.character[''] = loadImage('Assets/Characters/army_organiser_female.png');
    assets.character[''] = loadImage('Assets/Characters/army_reformer.png');
    assets.character[''] = loadImage('Assets/Characters/army_reformer_female.png');
    assets.character[''] = loadImage('Assets/Characters/artist.png');
    assets.character[''] = loadImage('Assets/Characters/artist_female.png');
    assets.character[''] = loadImage('Assets/Characters/asian_army_organiser.png');
    assets.character[''] = loadImage('Assets/Characters/asian_army_organiser_female.png');
    assets.character[''] = loadImage('Assets/Characters/asian_army_reformer.png');
    assets.character[''] = loadImage('Assets/Characters/asian_army_reformer_female.png');
    assets.character[''] = loadImage('Assets/Characters/asian_artist.png');
    assets.character[''] = loadImage('Assets/Characters/asian_artist_female.png');
    assets.character[''] = loadImage('Assets/Characters/asian_colonial_governor.png');
    assets.character[''] = loadImage('Assets/Characters/asian_colonial_governor_female.png');
    assets.character[''] = loadImage('Assets/Characters/asian_commandant.png');
    assets.character[''] = loadImage('Assets/Characters/asian_commandant_female.png');
    assets.character[''] = loadImage('Assets/Characters/asian_diplomat.png');
    assets.character[''] = loadImage('Assets/Characters/asian_diplomat_female.png');
    assets.character[''] = loadImage('Assets/Characters/asian_fortification_expert.png');
    assets.character[''] = loadImage('Assets/Characters/asian_fortification_expert_female.png');
    assets.character[''] = loadImage('Assets/Characters/asian_grand_captain.png');
    assets.character[''] = loadImage('Assets/Characters/asian_grand_captain_female.png');
    assets.character[''] = loadImage('Assets/Characters/asian_inquisitor.png');
    assets.character[''] = loadImage('Assets/Characters/asian_inquisitor_female.png');
    assets.character[''] = loadImage('Assets/Characters/asian_master_of_mint.png');
    assets.character[''] = loadImage('Assets/Characters/asian_master_of_mint_female.png');
    assets.character[''] = loadImage('Assets/Characters/asian_natural_scientist.png');
    assets.character[''] = loadImage('Assets/Characters/asian_natural_scientist_female.png');
    assets.character[''] = loadImage('Assets/Characters/asian_naval_reformer.png');
    assets.character[''] = loadImage('Assets/Characters/asian_naval_reformer_female.png');
    assets.character[''] = loadImage('Assets/Characters/asian_navigator.png');
    assets.character[''] = loadImage('Assets/Characters/asian_navigator_female.png');
    assets.character[''] = loadImage('Assets/Characters/asian_noAdvisorType.png');
    assets.character[''] = loadImage('Assets/Characters/asian_noAdvisorType_female.png');
    assets.character[''] = loadImage('Assets/Characters/asian_philosopher.png');
    assets.character[''] = loadImage('Assets/Characters/asian_philosopher_female.png');
    assets.character[''] = loadImage('Assets/Characters/asian_quartermaster.png');
    assets.character[''] = loadImage('Assets/Characters/asian_quartermaster_female.png');
    assets.character[''] = loadImage('Assets/Characters/asian_recruitmaster.png');
    assets.character[''] = loadImage('Assets/Characters/asian_recruitmaster_female.png');
    assets.character[''] = loadImage('Assets/Characters/asian_spymaster.png');
    assets.character[''] = loadImage('Assets/Characters/asian_spymaster_female.png');
    assets.character[''] = loadImage('Assets/Characters/asian_statesman.png');
    assets.character[''] = loadImage('Assets/Characters/asian_statesman_female.png');
    assets.character[''] = loadImage('Assets/Characters/asian_theologian.png');
    assets.character[''] = loadImage('Assets/Characters/asian_theologian_female.png');
    assets.character[''] = loadImage('Assets/Characters/asian_trader.png');
    assets.character[''] = loadImage('Assets/Characters/asian_trader_female.png');
    assets.character[''] = loadImage('Assets/Characters/asian_treasurer.png');
    assets.character[''] = loadImage('Assets/Characters/asian_treasurer_female.png');
    assets.character[''] = loadImage('Assets/Characters/blank-character.png');
    assets.character[''] = loadImage('Assets/Characters/colonial_governor.png');
    assets.character[''] = loadImage('Assets/Characters/colonial_governor_female.png');
    assets.character[''] = loadImage('Assets/Characters/commandant.png');
    assets.character[''] = loadImage('Assets/Characters/commandant_female.png');
    assets.character[''] = loadImage('Assets/Characters/diplomat.png');
    assets.character[''] = loadImage('Assets/Characters/diplomat_female.png');
    assets.character[''] = loadImage('Assets/Characters/fortification_expert.png');
    assets.character[''] = loadImage('Assets/Characters/fortification_expert_female.png');
    assets.character[''] = loadImage('Assets/Characters/grand_captain.png');
    assets.character[''] = loadImage('Assets/Characters/grand_captain_female.png');
    assets.character[''] = loadImage('Assets/Characters/inquisitor.png');
    assets.character[''] = loadImage('Assets/Characters/inquisitor_female.png');
    assets.character[''] = loadImage('Assets/Characters/master_of_mint.png');
    assets.character[''] = loadImage('Assets/Characters/master_of_mint_female.png');
    assets.character[''] = loadImage('Assets/Characters/natural_scientist.png');
    assets.character[''] = loadImage('Assets/Characters/natural_scientist_female.png');
    assets.character[''] = loadImage('Assets/Characters/naval_reformer.png');
    assets.character[''] = loadImage('Assets/Characters/naval_reformer_female.png');
    assets.character[''] = loadImage('Assets/Characters/navigator.png');
    assets.character[''] = loadImage('Assets/Characters/navigator_female.png');
    assets.character[''] = loadImage('Assets/Characters/noAdvisorType.png');
    assets.character[''] = loadImage('Assets/Characters/noAdvisorType_female.png');
    assets.character[''] = loadImage('Assets/Characters/philosopher.png');
    assets.character[''] = loadImage('Assets/Characters/philosopher_female.png');
    assets.character[''] = loadImage('Assets/Characters/quartermaster.png');
    assets.character[''] = loadImage('Assets/Characters/quartermaster_female.png');
    assets.character[''] = loadImage('Assets/Characters/recruitmaster.png');
    assets.character[''] = loadImage('Assets/Characters/recruitmaster_female.png');
    assets.character[''] = loadImage('Assets/Characters/spymaster.png');
    assets.character[''] = loadImage('Assets/Characters/spymaster_female.png');
    assets.character[''] = loadImage('Assets/Characters/statesman.png');
    assets.character[''] = loadImage('Assets/Characters/statesman_female.png');
    assets.character[''] = loadImage('Assets/Characters/theologian.png');
    assets.character[''] = loadImage('Assets/Characters/theologian_female.png');
    assets.character[''] = loadImage('Assets/Characters/trader.png');
    assets.character[''] = loadImage('Assets/Characters/trader_female.png');
    assets.character[''] = loadImage('Assets/Characters/treasurer.png');
    assets.character[''] = loadImage('Assets/Characters/treasurer_female.png');*/

}