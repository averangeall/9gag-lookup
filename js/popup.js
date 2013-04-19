var baseUrl = 'http://daisy.csie.org:2266';
var gid;
var input = '';
var allRecomms = [];

function is9gag(url) {
    return (url.match(/https?:\/\/9gag\.com/) != null);
}

function getGagId(url) {
    var mo = url.match(/https?:\/\/9gag\.com\/gag\/(\w+)/);
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
    }, 2000);
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
        pDefi.append($('<h4/>').html(defi.content));
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

function putAllDefi(word) {
    removeAllDefi();
    putLoading();
    var url = baseUrl + '/lookup/query/?word=' + word + '&gag_id=' + gid;
    reliableGet('query-' + word, url, function(defis) {
        removeLoading();
        for(var i in defis) {
            putHLine($('#definitions'));
            putSingleDefi(defis[i]);
        }
        putHLine($('#definitions'));
    });
}

function putSingleRecomm(word) {
    var button = $('<a/>').html(word)
                          .attr('href', '#')
                          .attr('class', 'btn btn-large btn-primary')
                          .click(function() {
                              putAllDefi(word);
                          });
    $('#recomm-words p').append(button)
                        .append(' ');
}

function filterRecomm() {
    removeAllRecomm();
    for(var i in allRecomms) {
        var lowerRecomm = allRecomms[i].toLowerCase();
        var lowerInput = input.toLowerCase()
        if(input == '' || lowerRecomm.indexOf(lowerInput) != -1)
            putSingleRecomm(allRecomms[i]);
    }
}

function userRecomm() {
    if($.trim(input) != '')
        putSingleRecomm(input);
}

function setRecommBtnClass() {
    $.each($('#recomm-words p a'), function(idx) {
        if(idx == 0)
            $(this).attr('class', 'btn btn-large btn-info')
    });
}

function putAllRecomm() {
    putLoading();
    reliableGet('recomm', baseUrl + '/lookup/recomm/' + gid, function(recommWords) {
        removeLoading();
        allRecomms = recommWords;
        filterRecomm();
        userRecomm();
    });
}

function setInputListener() {
    $('#input').keyup(function(evt) {
        input = $('#input').val();
        if(evt.which != 13) {
            filterRecomm();
            userRecomm();
            setRecommBtnClass();
        } else {
            $.each($('#recomm-words p a'), function(idx) {
                if(idx == 0)
                    putAllDefi($(this).html());
            });
        }
    });
}

$(function() {
    chrome.windows.getCurrent(function(w) {
        chrome.tabs.getSelected(w.id, function (response){
            if(!is9gag(response.url)) {
                putPrompt('請到 9GAG 的頁面查詢!');
            } else {
                gid = getGagId(response.url);
                if(gid == null)
                    putPrompt('請點進 9GAG 的頁面再進行查詢!');
                else {
                    putAllRecomm(gid);
                    setInputListener(gid);
                }
            }
        });
    });
});

