var myKingdom;
var KingdomController = {
    kingdomsUpdated: function () {
        if(myKingdom) {
            var serverKingdom = db.kingdoms[myKingdom.udid];
            if(serverKingdom == undefined) { //implies a new kingdom has been spawned
                location.reload(true); //will force reload cause our versions don't match
            } else {
                if (myKingdom.udid != serverKingdom.udid) {
                    location.reload(true); //will force reload cause our versions don't match
                } else {
                  iAmHost = myKingdom.hostID == userLocalID;
                }
            }
        } else {
            var kingdomKeys = Object.keys(db.kingdoms);
            if(kingdomKeys.length > 0) {
                for(var udid in db.kingdoms) {
                    if(db.kingdoms[udid].gameVersion == version) {
                        myKingdom = db.kingdoms[udid];
                        break;
                    }
                }
            } else {
                print("ERROR: Kingdom Controller can't find myKingdom or any kingdom in the Database");
            }
        }
    }
};
