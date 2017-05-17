var CC = {
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
        CC.database = firebase.database();

        CC.ref = CC.database.ref('Characters');

        CC.ref.on("value", CC.gotCharacterError, CC.errCharacterData);
    },
    createFaction: function(newCharacter) {
        var data = newFaction.buildJSON();
        print(data);
        FC.ref.push(data);
    },
    errCharacterData: function(error) {
        console.log("Something went wrong.");
        console.log(error);
    },
    gotCharacterData: function(data) {// The data comes back as an object
        var characters = data.val();
        print('here');
        // Grab all the keys to iterate over the object
        if(characters) {
            var keys = Object.keys(characters);
            CC.allCharacters = {};
            // Loop through array
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var c = new Character();
                c.loadJSON(characters[key]);
                c.udid = key;
                CC.allCharacters[key] = c;
            }
        }
    }
};