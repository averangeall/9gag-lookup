function putTitle(title) {
    $('#title').html(title);
}

//function putHLine(to) {
//    var line = $('<p/>');
//    for(var i = 0; i < 80; ++ i) {
//        var slice = $('<img/>').attr('src', 'images/hline-slice.png');
//        line.append(slice);
//    }
//    to.append(line);
//}
//

//function putPrompt(msg) {
//    $('#prompt').html(msg);
//}
//
//function removeAllDefi() {
//    $('#definitions').empty();
//}
//
//function putSingleDefi(defi) {
//    var pDefi = $('<p/>');
//    $('#definitions').append(pDefi);
//    if(defi.type == 'text') {
//        pDefi.append($('<h4/>').html(defi.content));
//    } else if(defi.type == 'image') {
//        var image = $('<img/>').attr('src', defi.content)
//                               .css('max-width', '80%');
//        pDefi.append(image);
//    } else if(defi.type == 'video') {
//        if(defi.src == 'youtube.com') {
//            var mo = defi.content.match(/https?:\/\/www\.youtube\.com\/watch\?v=(.+)/);
//            if(mo == null || mo.length != 2)
//                return;
//            var videoId = mo[1];
//            var divYoutube = $('<div/>').attr('id', 'youtube-' + videoId)
//                                        .html('You need Flash player 8+ and JavaScript enabled to view this video.');
//            pDefi.append(divYoutube);
//            swfobject.embedSWF("https://www.youtube.com/v/" + videoId,
//                               'youtube-' + videoId, "300", "200", "8", null, null, null, null);
//        }
//    }
//}
//
//function putAllDefi(word) {
//    removeAllDefi();
//    putLoading();
//    var url = '/lookup/query/?word=' + word + '&gag_id=' + gag_id;
//    reliableGet('query-' + word, url, function(defis) {
//        removeLoading();
//        for(var i in defis) {
//            putHLine($('#definitions'));
//            putSingleDefi(defis[i]);
//        }
//        putHLine($('#definitions'));
//    });
//}
//
//function userRecomm() {
//    if($.trim(input) != '')
//        putSingleRecomm(input);
//}
//
//function setRecommBtnClass() {
//    $.each($('#recomm-words p a'), function(idx) {
//        if(idx == 0)
//            $(this).attr('class', 'btn btn-large btn-info')
//    });
//}
//
//function setInputListener() {
//    $('#input').keyup(function(evt) {
//        input = $('#input').val();
//        if(evt.which != 13) {
//            filterRecomm();
//            userRecomm();
//            setRecommBtnClass();
//        } else {
//            $.each($('#recomm-words p a'), function(idx) {
//                if(idx == 0)
//                    putAllDefi($(this).html());
//            });
//        }
//    });
//}

$(function() {
    chrome.windows.getCurrent(function(w) {
        chrome.tabs.getSelected(w.id, function (response){
            loadUserInfo(function() {
                chrome.tabs.executeScript(null, {file: "js/gag-info.js"});
            });
        });
    });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    gagId = request.gag_id;
    putTitle(request.title);
    putAllRecomm(gag_id);
    //setInputListener(gag_id);
});

