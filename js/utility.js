function is9gag(url) {
    return (url.match(/https?:\/\/9gag\.com/) != null);
}

function makeExtraUrl(stuff, action) {
    return '/lookup/' + stuff + '/' + action + '/?gag_id=' + gagId + '&user_id=' + userId + '&valid_key=' + userKey;
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

