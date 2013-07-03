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
    putAllRecomms(gagId);
    //setInputListener(gag_id);
    focusInput();
});

