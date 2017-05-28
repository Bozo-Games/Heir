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