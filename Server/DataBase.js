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

        db._ref.kingdoms = db._database.ref('Kingdoms');
        db._ref.kingdoms.on("value", db.gotKingdomData, db.errData);

        db._ref.factions = db._database.ref('Factions');
        db._ref.factions.on("value", db.gotFactionData, db.errData);

        db._ref.characters = db._database.ref('Characters');
        db._ref.characters.on("value", db.gotCharacterData, db.errData);


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

        var currentdate = new Date();
        var datetime =  currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();

        db.createKingdom(new Kingdom({name:"The Great Bozo Kingdom of - " + datetime}));

        db.createFaction(new Faction({name:"Test A",    color:COLOR.factions.a}));
        db.createFaction(new Faction({name:"Test B",    color:COLOR.factions.b}));
        db.createFaction(new Faction({name:"Test C",    color:COLOR.factions.c}));
        db.createFaction(new Faction({name:"Test D",    color:COLOR.factions.d}));
        db.createFaction(new Faction({name:"Test E",    color:COLOR.factions.e}));


        db.createCharacter(new Character({name:'Doria',     body:0, mind:0, spirit:0}));
        db.createCharacter(new Character({name:'Nicholas',  body:1, mind:2, spirit:2}));
        db.createCharacter(new Character({name:'Blondelle', body:1, mind:2, spirit:0}));
        db.createCharacter(new Character({name:'Flori',     body:3, mind:0, spirit:1}));
        db.createCharacter(new Character({name:'Jarrid',    body:2, mind:0, spirit:0}));
        db.createCharacter(new Character({name:'Loutitia',  body:0, mind:3, spirit:0}));
        db.createCharacter(new Character({name:'Dean',      body:3, mind:0, spirit:2}));
        db.createCharacter(new Character({name:'Alexa',     body:2, mind:2, spirit:0}));
        db.createCharacter(new Character({name:'Alano',     body:3, mind:2, spirit:1}));
        db.createCharacter(new Character({name:'Willa',     body:1, mind:3, spirit:3}));
        db.createCharacter(new Character({name:'Jase',      body:1, mind:0, spirit:0}));
        db.createCharacter(new Character({name:'Pietrek',   body:1, mind:0, spirit:2}));
        db.createCharacter(new Character({name:'Yalonda',   body:2, mind:1, spirit:0}));
        db.createCharacter(new Character({name:'Fran',      body:1, mind:2, spirit:1}));
        db.createCharacter(new Character({name:'Candy',     body:1, mind:0, spirit:3}));
        db.createCharacter(new Character({name:'Ives',      body:2, mind:0, spirit:2}));
        db.createCharacter(new Character({name:'Gav',       body:1, mind:3, spirit:2}));
        db.createCharacter(new Character({name:'Henriette', body:2, mind:1, spirit:3}));
        db.createCharacter(new Character({name:'Michel',    body:3, mind:0, spirit:0}));
        db.createCharacter(new Character({name:'Wendie',    body:0, mind:2, spirit:1}));
        db.createCharacter(new Character({name:'Renata',    body:0, mind:3, spirit:1}));
        db.createCharacter(new Character({name:'Nanni',     body:3, mind:0, spirit:2}));
        db.createCharacter(new Character({name:'Babita',    body:2, mind:3, spirit:0}));
        db.createCharacter(new Character({name:'Purcell',   body:3, mind:2, spirit:1}));
        db.createCharacter(new Character({name:'Roy',       body:1, mind:0, spirit:0}));
        db.createCharacter(new Character({name:'Delaney',   body:2, mind:2, spirit:2}));
        db.createCharacter(new Character({name:'Britt',     body:3, mind:2, spirit:0}));
        db.createCharacter(new Character({name:'Bail',      body:0, mind:2, spirit:0}));
        db.createCharacter(new Character({name:'Weber',     body:3, mind:2, spirit:3}));
        db.createCharacter(new Character({name:'Eric',      body:2, mind:0, spirit:3}));
        db.createCharacter(new Character({name:'Camella',   body:1, mind:0, spirit:2}));
        db.createCharacter(new Character({name:'Babbette',  body:3, mind:0, spirit:3}));
    },

    //Kingdom CRUD
    createKingdom: function (newKingdom) {
        var data = newKingdom.buildJSON();
        return db._ref.kingdoms.push(data);
    },
    updateKingdom: function (kingdom) {
        var data = kingdom.buildJSON();
        return db._ref.kingdoms.child(kingdom.udid).update(data);
    },
    batchUpdateKindoms: function () {
        var updates = {};
        for(var k in db.kingdoms) {
            var kingdom = db.kingdoms[k];
            updates['/' + k] = kingdom.buildJSON();
        }
        return  db._ref.kingdoms.update(updates);
    },
    gotKingdomData: function(data) {
        var kingdoms = data.val();
        // Grab all the keys to iterate over the object
        if(kingdoms) {
            var keys = Object.keys(kingdoms);
            var updatedKingdoms = {};
            // Loop through array
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var k = db.kingdoms[key];
                if(k == undefined) {
                    k = new Kingdom(kingdoms[key]);
                } else {
                    print('loading up kingdom');
                    k.loadJSON(kingdoms[key]);
                }
                k.udid = key;
                updatedKingdoms[key] = k;
            }
            db.kingdoms = updatedKingdoms;

            //now update listeners
            for (var i = 0; i < db.notifications.kingdoms.length; i++) {
                var callbackObject = db.notifications.kingdoms[i];
                if (typeof callbackObject.kingdomsUpdated === "function") {
                    callbackObject.kingdomsUpdated();
                } else {
                    console.log('WARRING: kingdomsUpdated() not defined for listener '+callbackObject);
                }
            }
        }
    },
    //Faction CRUD
    createFaction: function(newFaction) {
        var data = newFaction.buildJSON();
        return db._ref.factions.push(data);
    },
    updateFaction: function(faction) {
        var data = faction.buildJSON();
        return db._ref.factions.child(faction.udid).update(data);
    },
    batchUpdateFactions: function () {
        var updates = {};
        for(var f in db.factions) {
            var faction = db.factions[f];
            updates['/' + f] = faction.buildJSON();
        }
        return  db._ref.factions.update(updates);
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
                var f = db.factions[key];
                if(f == undefined) {
                    f = new Faction(factions[key]);
                } else {
                    f.loadJSON(factions[key]);
                }
                f.udid = key;
                updatedfactions[key] = f;
            }
            db.factions = updatedfactions;
            //now update listeners
            for (var i = db.notifications.factions.length - 1; i >= 0; i--) {
                var callbackObject = db.notifications.factions[i];
                if (typeof callbackObject.factionsUpdated === "function") {
                    callbackObject.factionsUpdated();
                } else {
                    console.log('WARRING: factionsUpdated() not defined for listener and will be removed '+callbackObject);
                    db.notifications.factions.splice(i,1);
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
        return db._ref.factions.child(character.udid).update(data);
    },
    batchUpdateCharacters: function () {
        var updates = {};
        for(var c in db.characters) {
            var character = db.characters[f];
            updates['/' + c] = character.buildJSON();
        }
        return  db._ref.characters.update(updates);
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