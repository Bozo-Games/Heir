var db = {
    _database: null,
    //this is for updatin and others
    _ref:{
        factions:null,
        characters:null,
        kingdoms:null,
        titles:null,
        quests:null,
        laws:null
    },
    //These are where the objects get stored for manipulation
    factions: {},
    characters: {},
    kingdoms: {},
    titles: {},
    quests: {},
    laws: {},
    //These are how the rest of the app gets notified
    notifications: {
        factions: [],
        characters: [],
        kingdoms: [],
        titles: [],
        quests: [],
        laws: []
    },
    addListener: function(tableName,listener) {
        if (db.notifications[tableName] != undefined) {
            if(listener)
            db.notifications[tableName].pushIfNotExist(listener,function(e) {
                return e === listener;
            });
        } else {
            Console.log('WARNING: tying to add listener to table that dose not exist (' + tableName + ')');
        }
    },
    removeListener: function(tableName, listener) {
        if (db.notifications[tableName] != undefined) {
            for(var i = db.notifications[tableName].length-1; i >= 0; i-- ) {
                if(db.notifications[tableName][i] === listener) {
                    db.notifications[tableName].splice(i,1);
                }
            }
        } else {
            Console.log('WARNING: tying to remove listener to table that dose not exist ('+tableName+')');
        }
    },
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
        db._ref.kingdoms.on("value", db.gotKingdomData, db.errData);

        db._ref.titles = db._database.ref('Titles');
        db._ref.titles.on("value", db.gotTitleData, db.errData);

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
        myFaction = null;
        db._ref.factions.remove();
        db._ref.characters.remove();
        db._ref.kingdoms.remove();
        db._ref.titles.remove();
        db._ref.quests.remove();
        db._ref.laws.remove();

        db.createFaction(new Faction({name:"Test A",    color:COLOR.factions.a}));
        db.createFaction(new Faction({name:"Test B",    color:COLOR.factions.b}));
        db.createFaction(new Faction({name:"Test C",    color:COLOR.factions.c}));
        db.createFaction(new Faction({name:"Test D",    color:COLOR.factions.d}));
        db.createFaction(new Faction({name:"Test E",    color:COLOR.factions.e}));

        db.createCharacter(new Character({name:'Bob'}));
        db.createCharacter(new Character({name:'Frank'}));
        db.createCharacter(new Character({name:'Clare'}));
        db.createCharacter(new Character({name:'Jill'}));
    },
    //Faction CRUD
    createFaction: function(newFaction) {
        var data = newFaction.buildJSON();
        return db._ref.factions.push(data);
    },
    updateFaction: function(faction) {
        var data = faction.buildJSON();
        print('pushing update ' + data.name);
        console.log(data);
        return db._ref.factions.child(faction.udid).update(data);
    },
    removeFaction: function(faction) {
        var data = faction.buildJSON();
        return db._ref.factions.child(faction.udid).remove();
    },
    gotFactionData: function(data) {// The data comes back as an object
        var factions = data.val();
        print('faction data ' + factions);
        // Grab all the keys to iterate over the object
        if(factions) {
            var keys = Object.keys(factions);
            var updatedfactions = {};
            // Loop through array
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var f = db.factions[key];
                if(f == undefined) {
                    f = new Faction(factions[key]);
                } else {
                    print('got update ' + f.name + '\n' + factions[key].playerCookieID);
                    f.loadJSON(factions[key]);
                }
                f.udid = key;
                updatedfactions[key] = f;
            }
            db.factions = updatedfactions;
            //now update listeners
            for (var i = 0; i < db.notifications.factions.length; i++) {
                var callbackObject = db.notifications.factions[i];
                if (typeof callbackObject.factionsUpdated === "function") {
                    callbackObject.factionsUpdated();
                } else {
                    console.log('WARRING: factionsUpdated() not defined for listener '+callbackObject);
                }
            }
        }
    },
    //Character CRUD
    createCharacter: function (newCharacter) {
        var data = newCharacter.buildJSON();
        return db._ref.characters.push(data);
    },
    updateCharacter: function (character) {
        var data = character.buildJSON();
        return db._ref.characters.update(data);
    },
    gotCharacterData: function(data) {
        var characters = data.val();
        // Grab all the keys to iterate over the object
        if(characters) {
            var keys = Object.keys(characters);
            var updatedharacters = {};
            // Loop through array
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var c = new Character(characters[key]);
                c.udid = key;
                updatedharacters[key] = c;
            }
            db.characters = updatedharacters;
        }
    },
    //Kingdom CRUD
    createKingdom: function (newKingdom) {
        var data = newKingdom.buildJSON();
        return db._ref.kingdoms.push(data);
    },
    updateKingdom: function (kingdom) {
        var data = kingdom.buildJSON();
        return db._ref.kingdoms.update(data);
    },
    gotKingdomData: function(data) {
        var kingdoms = data.val();
        // Grab all the keys to iterate over the object
        if(kingdoms) {
            var keys = Object.keys(kingdoms);
            var updatedharacters = {};
            // Loop through array
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var c = new Kingdom(kingdoms[key]);
                c.udid = key;
                updatedharacters[key] = c;
            }
            db.kingdoms = updatedharacters;
        }
    },
    //Title CRUD
    createTitle: function (newTitle) {
        var data = newTitle.buildJSON();
        return db._ref.titles.push(data);
    },
    updateTitle: function (title) {
        var data = title.buildJSON();
        return db._ref.titles.update(data);
    },
    gotTitleData: function(data) {
        var titles = data.val();
        // Grab all the keys to iterate over the object
        if(titles) {
            var keys = Object.keys(titles);
            var updatedharacters = {};
            // Loop through array
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var c = new Title(titles[key]);
                c.udid = key;
                updatedharacters[key] = c;
            }
            db.titles = updatedharacters;
        }
    },
    //Quest CRUD
    createQuest: function (newQuest) {
        var data = newQuest.buildJSON();
        return db._ref.quests.push(data);
    },
    updateQuest: function (quest) {
        var data = quest.buildJSON();
        return db._ref.quests.update(data);
    },
    gotQuestData: function(data) {
        var quests = data.val();
        // Grab all the keys to iterate over the object
        if(quests) {
            var keys = Object.keys(quests);
            var updatedharacters = {};
            // Loop through array
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var c = new Quest(quests[key]);
                c.udid = key;
                updatedharacters[key] = c;
            }
            db.quests = updatedharacters;
        }
    },
    //Law CRUD
    createLaw: function (newLaw) {
        var data = newLaw.buildJSON();
        return db._ref.laws.push(data);
    },
    updateLaw: function (law) {
        var data = law.buildJSON();
        return db._ref.laws.update(data);
    },
    gotLawData: function(data) {
        var laws = data.val();
        // Grab all the keys to iterate over the object
        if(laws) {
            var keys = Object.keys(laws);
            var updatedharacters = {};
            // Loop through array
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var c = new Law(laws[key]);
                c.udid = key;
                updatedharacters[key] = c;
            }
            db.laws = updatedharacters;
        }
    },
};