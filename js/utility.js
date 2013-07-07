function is9gag(url) {
    return (url.match(/https?:\/\/9gag\.com/) != null);
}

function makeExtraUrl(stuff, action, args) {
    var front = '/lookup/' + stuff + '/' + action + '/';
    var back = '';
    if(args !== undefined) {
        args['gag_id'] = gagId;
        args['user_id'] = userId;
        args['valid_key'] = userKey;
        for(var key in args) {
            if(back != '')
                back += '&';
            back += key + '=' + args[key];
        }
        back = '?' + back;
    }
    return front + back;
}

var reliableTasks = {};
function reliableGet(extraUrl, success) {
    reliableTasks[extraUrl] = false;
    for(var i in baseUrls) {
        var url = baseUrls[i] + extraUrl;
        console.log(url);
        $.get(url, function(data) {
            if(reliableTasks[extraUrl])
                return;
            reliableTasks[extraUrl] = true;
            success(data);
        }, 'json');
    }
}

