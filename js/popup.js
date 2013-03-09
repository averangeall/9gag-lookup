function is9gag(url) {
    return true;
    return (url.match(/https?:\/\/9gag\.com/) != null);
}

function getGagId(url) {
    return '12345';
    var mo = url.match(/https?:\/\/9gag\.com\/gag\/(\d+)/);
    if(mo == null || mo.length != 2)
        return null;
    return mo[1];
}

var reliableTimeId = {};
function reliableGet(name, url, success) {
    var todo = function() {
        if(reliableTimeId[name] == null)
            return;
        $.get(url, function(data) {
            success(data);
            reliableTimeId[name] = null;
        }, 'json');
    }
    reliableTimeId[name] = setInterval(function() {
        todo();
    }, 500);
    todo();
}

function putHLine(to) {
    var line = $('<p/>');
    for(var i = 0; i < 80; ++ i) {
        var slice = $('<img/>').attr('src', 'fig/hline-slice.png');
        line.append(slice);
    }
    to.append(line);
}

function removeLoading() {
    $('#loading').empty();
}

function putLoading() {
    var loadingImg = $('<img/>').attr('src', 'fig/loading.gif');
    $('#loading').empty().append(loadingImg);
}

function putPrompt(msg) {
    $('#prompt').html(msg);
}

function removeAllRecomm() {
    $('#recomm-words p').empty();
}

function removeAllDefi() {
    $('#definitions').empty();
}

function putSingleDefi(defi) {
    var pDefi = $('<p/>');
    $('#definitions').append(pDefi);
    if(defi.type == 'text') {
        pDefi.append($('<h3/>').html(defi.content))
             .append($('<span/>').html(' - ' + defi.src));
    } else if(defi.type == 'image') {
        var image = $('<img/>').attr('src', defi.content)
                               .css('max-width', '80%');
        pDefi.append(image);
    } else if(defi.type == 'video') {
        if(defi.src == 'youtube.com') {
            var mo = defi.content.match(/https?:\/\/www\.youtube\.com\/watch\?v=(.+)/);
            if(mo == null || mo.length != 2)
                return;
            var videoId = mo[1];
            var divYoutube = $('<div/>').attr('id', 'youtube-' + videoId)
                                        .html('You need Flash player 8+ and JavaScript enabled to view this video.');
            pDefi.append(divYoutube);
            swfobject.embedSWF("https://www.youtube.com/v/" + videoId,
                               'youtube-' + videoId, "300", "200", "8", null, null, null, null);
        }
    }
}

function putAllDefi(word, gid) {
    putLoading();
    var url = 'http://captain.csie.org/lookup/query/?word=' + word + '&gag_id=' + gid;
    reliableGet('query-' + word, url, function(definitions) {
        removeLoading();
        removeAllDefi();
        for(var i in definitions) {
            putHLine($('#definitions'));
            putSingleDefi(definitions[i]);
        }
        putHLine($('#definitions'));
    });
}

function putSingleRecomm(word, gid) {
    var button = $('<a/>').html(word)
                          .attr('href', '#')
                          .attr('class', 'btn btn-large btn-primary')
                          .click(function() {
                              putAllDefi(word, gid);
                          });
    $('#recomm-words p').append(button)
                        .append(' ');
}

function putAllRecomm(gid) {
    putLoading();
    reliableGet('recomm', 'http://captain.csie.org/lookup/recomm/' + gid, function(recommWords) {
        removeLoading();
        removeAllRecomm();
        for(var i in recommWords)
            putSingleRecomm(recommWords[i], gid);
    });
}

function setInputListener(gid) {
    $('#input').keypress(function(evt) {
        if(evt.which == 13)
            putAllDefi(gid, $('#input').val());
    });
}

$(function() {
    chrome.windows.getCurrent(function(w) {
        chrome.tabs.getSelected(w.id, function (response){
            if(!is9gag(response.url)) {
                putPrompt('請到 9GAG 的頁面查詢!');
            } else {
                var gid = getGagId(response.url);
                if(gid == null)
                    putPrompt('請點進 9GAG 的頁面再進行查詢!');
                else {
                    putPrompt('或是您想要查的字在這裡呢？');
                    putAllRecomm(gid);
                    setInputListener(gid);
                }
            }
        });
    });
});
