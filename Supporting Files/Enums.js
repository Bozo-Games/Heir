var STATIC = {
    gamePhase: {
        newGame: 0,
        initialKingSelect: 1,
        questBuilding: 2,
        questSelection: 3,
        resourceCommitment: 4,
        questSimulation: 5,
        questResolution: 6,
        heirInherits: 7,
        scoreingTheGame: 8
    },
    questArchetype : {
        underConstruction: -1,
        hunt: 0,
        trade: 1,
        build: 2,
        destroy: 3
    },
    resourceType: {
        manpower: 0,
        food: 1,
        money: 2
    },
    factionLoyalties: {
        none: 0,
        leader: 1,
        heir: 2,
        champion: 3
    },
	initialKingSelectLaws: { //this is used for animation switches
		randomStart:0
	}
};
