function gotoLatestGag() {
    chrome.tabs.create({url: 'http://9gag.com/gag/6894177'});
    updateGotoGag();
}

function updateGotoGag() {
    chrome.browserAction.onClicked.removeListener(gotoLatestGag);
    chrome.browserAction.onClicked.addListener(gotoLatestGag);
}

function decideAction(tabId, changeInfo, tab) {
    if(is9gag(tab.url) && getGagId(tab.url) != null) {
        chrome.browserAction.setPopup({tabId: tab.id, popup: 'popup.html'});
        chrome.browserAction.setIcon({path: 'images/icon-19.png', tabId: tabId});
    } else
        updateGotoGag();
}

chrome.tabs.onUpdated.removeListener(decideAction);
chrome.tabs.onUpdated.addListener(decideAction);
