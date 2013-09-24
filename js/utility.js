function makeExtraUrl(stuff, action, args) {
    var front = '/lookup/' + stuff + '/' + action + '/';
    var back = '';
    if(args !== undefined) {
        args['gag_id'] = curGagId;
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

function reliableGet(extraUrl, success) {
    var url = baseUrl + extraUrl;
    console.log(url);
    $.get(url, success, 'json');
}

