function is9gag(url) {
    return (url.match(/https?:\/\/9gag\.com/) != null);
}

function getGagId(url) {
    var mo = url.match(/https?:\/\/9gag\.com\/gag\/(\w+)/);
    if(mo == null || mo.length != 2)
        return null;
    return mo[1];
}

function makeExtraUrl(stuff, action) {
    gag_id = 'ajYbzzx';
    return '/lookup/' + stuff + '/' + action + '/?gag_id=' + gag_id + '&user_id=84920&valid_key=hello';
}

function putLoading() {
    var loadingImg = $('<img/>').attr('src', 'images/loading.gif');
    $('#loading').empty().append(loadingImg);
}

function removeLoading() {
    $('#loading').empty();
}

var reliableTasks = {};
function reliableGet(name, extraUrl, success) {
    reliableTasks[name] = false;
    for(var i in baseUrls) {
        var url = baseUrls[i] + extraUrl;
        alert(url);
        $.get(url, function(data) {
            if(reliableTasks[name])
                return;
            success(data);
            reliableTasks[name] = true;
        }, 'json');
    }
}

