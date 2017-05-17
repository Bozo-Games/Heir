var db = {
    _database: null,
    //this is for updatin and others
    _ref:{
        factions:null,
        characters:null,
        kingdoms:null,
        titles:null,
        quests:null,
        laws:null,
    },
    //These are where the objects get stored for manipulation
    factions: {},
    characters: {},
    kingdoms: {},
    titles: {},
    quests: {},
    laws: {},
    //Data base set up and loading
    loadFirebase: function() {
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyD3h6wR7gIbIwnCNRsXB4-XmgasvJvjpWM",
            authDomain: "bozo-games.firebaseapp.com",
            databaseURL: "https://bozo-games.firebaseio.com",
            projectId: "bozo-games",
            storageBucket: "bozo-games.appspot.com",
            messagingSenderId: "33786857665"
        };
        firebase.initializeApp(config);
        db._database = firebase.database();

        db._ref.factions = db._database.ref('Factions');
        db._ref.factions.on("value", db.gotFactionData, db.errData);

        db._ref.characters = db._database.ref('Characters');
        db._ref.characters.on("value", db.gotCharacterData, db.errData);

        db._ref.kingdoms = db._database.ref('Kingdoms');
        db._ref.kingdoms.on("value", db.gotKindomData, db.errData);

        db._ref.titles = db._database.ref('Titles');
        db._ref.titles.on("value", db.gotTileData, db.errData);

        db._ref.quests = db._database.ref('Quests');
        db._ref.quests.on("value", db.gotQuestData, db.errData);

        db._ref.laws = db._database.ref('Laws');
        db._ref.laws.on("value", db.gotLawData, db.errData);
    },
    errData: function(error) {
        console.log("Something went wrong with fire base.");
        console.log(error);
    },
    clearAndSeedDataBase: function() {
        db._ref.factions.remove();
        db._ref.characters.remove();
        db._ref.kingdoms.remove();
        db._ref.titles.remove();
        db._ref.quests.remove();
        db._ref.laws.remove();

        var f = new Faction({id:null,name:"Test A"});
        db.createFaction(f);
    },
    createFaction: function(newFaction) {
        var data = newFaction.buildJSON();
        return db._ref.factions.push(data);
    },
    updateFaction: function(faction) {
        var data = faction.buildJSON();
        return db._ref.factions.update(data);
    },
    removeFaction: function(faction) {
        var data = faction.buildJSON();
        return db._ref.factions.child(faction.udid).remove();
    },
    gotFactionData: function(data) {// The data comes back as an object
        var factions = data.val();
        // Grab all the keys to iterate over the object
        if(factions) {
            var keys = Object.keys(factions);
            var updatedfactions = {};
            // Loop through array
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var f = new Faction(factions[key]);
                f.udid = key;
                console.log('here' + f.udid);
                updatedfactions[key] = f;
            }
            db.factions = updatedfactions;
        }
    },
    gotCharacterData: function(data) {
    },
    gotKindomData: function(data) {
    },
    gotTileData: function(data) {
    },
    gotQuestData: function(data) {
    },
    gotLawData: function(data) {
    }
};