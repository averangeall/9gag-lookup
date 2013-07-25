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
    setInputListener();
    focusInput();
});

