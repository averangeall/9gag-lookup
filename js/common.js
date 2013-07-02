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
    return '/lookup/' + stuff + '/' + action + '/?gag_id=' + gagId + '&user_id=' + userId + '&valid_key=' + userKey;
}

function putLoading() {
    var loadingImg = $('<img/>').attr('src', 'images/loading.gif');
    $('#loading').empty().append(loadingImg);
}

function removeLoading() {
    $('#loading').empty();
}

var reliableTasks = {};
function reliableGet(extraUrl, success) {
    reliableTasks[extraUrl] = false;
    for(var i in baseUrls) {
        var url = baseUrls[i] + extraUrl;
        $.get(url, function(data) {
            if(reliableTasks[extraUrl])
                return;
            reliableTasks[extraUrl] = true;
            success(data);
        }, 'json');
    }
}

