function setUserInfo() {
    chrome.storage.sync.get('user_lookup_id', function(res) {
        if(res['user_lookup_id'] !== undefined)
            return;
        reliableGet('/lookup/user/new/', function(userInfo) {
            if(userInfo['status'] != 'OKAY')
                return;
            var tuple = {};
            tuple['user_lookup_id'] = userInfo['respond']['id'];
            tuple['user_lookup_key'] = userInfo['respond']['key'];
            chrome.storage.sync.set(tuple);
        });
    });
}


function loadUserInfo(success) {
    chrome.storage.sync.get(['user_lookup_id', 'user_lookup_key'], function(res) {
        userId = res['user_lookup_id'];
        userKey = res['user_lookup_key'];
        if(success !== undefined)
            success();
    });
}
