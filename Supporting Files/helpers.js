function allResourceTypes() {
    return Object.keys(STATIC.resourceType);
}
function resourceNameByEnum(number) {
    var keys = allResourceTypes();
    for (var i = 0;  i < keys.length; i++) {
        var key = keys[i];
        if (STATIC.resourceType[key] == number) {
            return key;
        }
    }
    return "ERROR: Resource enum " + number + " is not valid.";
}
function buildUserID() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}
// check if an element exists in array using a comparer function
// comparer : function(currentElement)
Array.prototype.inArray = function(comparer) {
    for(var i=0; i < this.length; i++) {
        if(comparer(this[i])) return true;
    }
    return false;
};
// adds an element to the array if it does not already exist using a comparer
// function
Array.prototype.pushIfNotExist = function(element, comparer) {
    if (!this.inArray(comparer)) {
        this.push(element);
    }
};
function logTODOFunction(msg) {
    return function () {
        console.log("TODO: "+ msg);
    }
}
function findRandomCharacterIDNotAsignedToFaction() {
    var posible = [];
    for (var c in db.characters) {
        var character = db.characters[c];
        if(!c.factionLoyalty) {
            posible.push(c);
        } else if(c.factionLoyalty == STATIC.factionLoyalties.none) {
            posible.push(c);
        }
    }
    return posible[Math.floor(Math.random() * posible.length)];
}

function locationOnCircle(cx,cy,r,a) {
    var q = 0;
    var theta = a;
    var px = 1;
    var py = 1;
    if (a > Math.PI / 2) {
        if(a > Math.PI) {
            if(a > Math.PI * 1.5) {
                theta = 2*Math.PI - a;
                px = 1;
                py = 1;
                q = 4;
            } else {
                theta = a - Math.PI;
                px = -1;
                py = 1;
                q = 3;
            }
        } else {
            theta = Math.PI - a;
            px = -1;
            py = -1;
            q = 2;
        }
    } else {
        theta = a;
        py = -1;
        px = 1;
        q = 1;
    }
    var x = cx + px * (Math.sqrt(Math.pow(r,2) - Math.pow(sin(theta) * r,2)));
    var y = cy + py * (Math.sqrt(Math.pow(r,2) - Math.pow(cos(theta) * r,2)));
    return {x:x,y:y,q:q};
}