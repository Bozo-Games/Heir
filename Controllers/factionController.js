var FC = {
    database: null,
    ref:null,
    allFactions: {},
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
        FC.database = firebase.database();

        FC.ref = FC.database.ref('Factions');

        FC.ref.on("value", FC.gotFactionData, FC.errFactionData);
    },
    createFaction: function(newFaction) {
        var data = newFaction.buildJSON();
        print(data);
        FC.ref.push(data);
    },
    errFactionData: function(error) {
        console.log("Something went wrong.");
        console.log(error);
    },
    gotFactionData: function(data) {// The data comes back as an object
        var factions = data.val();
        print('here');
        // Grab all the keys to iterate over the object
        if(factions) {
            var keys = Object.keys(factions);
            FC.allFactions = {};
            // Loop through array
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var f = new Faction();
                f.loadJSON(factions[key]);
                f.udid = key;
                console.log('here' + f.udid);
                FC.allFactions[key] = f;
            }
        }
    }
};