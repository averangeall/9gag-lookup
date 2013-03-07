function is9gag(url) {
    return (url.match(/https?:\/\/9gag.com/) != null);
}

function getGagId(url) {
    var mo = url.match(/https?:\/\/9gag.com\/gag\/(\d+)/);
    if(mo == null || mo.length != 2)
        return null;
    return mo[1];
}

function putPrompt(msg) {
    $('#prompt').html(msg);
}

function putSingleRecomm(word) {
    var button = $('<a/>');
    button.html(word);
    button.attr('href', '#');
    button.attr('class', 'btn btn-large btn-primary');
    $('#recomm-words p').append(button);
    $('#recomm-words p').append(' ');
}

function putAllRecomm(gid) {
    var recommWords = ['Infantiles', 'Equipment', 'Juegos', 'Equipes', 'Para'];
    for(var i in recommWords)
        putSingleRecomm(recommWords[i]);
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
                }
            }
        });
    });
});

