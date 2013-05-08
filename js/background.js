function gotoLatestGag() {
    chrome.tabs.create({url: 'http://9gag.com/gag/6894177'});
}

function updateGotoGag() {
    if(!chrome.browserAction.onClicked.hasListener(gotoLatestGag))
        chrome.browserAction.onClicked.addListener(gotoLatestGag);
}

function decideAction(tabId, changeInfo, tab) {
    updateGotoGag();
    if(is9gag(tab.url) && getGagId(tab.url) != null) {
        chrome.browserAction.onClicked.removeListener(gotoLatestGag);
        chrome.browserAction.setPopup({tabId: tab.id, popup: 'popup.html'});
        chrome.browserAction.setIcon({path: 'images/icon-19.png', tabId: tabId});
    }
}

if(!chrome.tabs.onUpdated.hasListener(decideAction))
    chrome.tabs.onUpdated.addListener(decideAction);

