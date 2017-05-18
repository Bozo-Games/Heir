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