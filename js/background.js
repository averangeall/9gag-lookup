function goto9gag() {
    chrome.tabs.create({url: 'http://9gag.com/'});
}

function decideAction(tabId, changeInfo, tab) {
    if(!is9gag(tab.url)) {
        if(!chrome.browserAction.onClicked.hasListener(goto9gag))
            chrome.browserAction.onClicked.addListener(goto9gag);
    } else {
        chrome.browserAction.setPopup({tabId: tab.id, popup: 'popup.html'});
        chrome.browserAction.setIcon({path: 'images/icon-19.png', tabId: tabId});
    }
}

if(!chrome.tabs.onUpdated.hasListener(decideAction))
    chrome.tabs.onUpdated.addListener(decideAction);

setUserInfo();