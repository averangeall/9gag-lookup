function is9gag(url) {
    return (url.match(/https?:\/\/9gag\.com/) != null);
}

function getGagId(url) {
    var mo = url.match(/https?:\/\/9gag\.com\/gag\/(\w+)/);
    if(mo == null || mo.length != 2)
        return null;
    return mo[1];
}

var reliableTasks = {};
function reliableGet(name, extraUrl, success) {
    reliableTasks[name] = false;
    for(var i in baseUrls) {
        var url = baseUrls[i] + extraUrl;
        $.get(url, function(data) {
            if(reliableTasks[name])
                return;
            success(data);
            reliableTasks[name] = true;
        }, 'json');
    }
}

