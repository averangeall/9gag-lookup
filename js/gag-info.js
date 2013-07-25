var url = window.location.toString();
if(url.match(/https?:\/\/9gag\.com/) != null) {
    var mo = url.match(/https?:\/\/9gag\.com\/gag\/(\w+)/);
    var article = document.getElementsByClassName('badge-in-view-focus')[0];
    var gag_id, title;
    if(mo == null) {
        gag_id = article.getAttribute('data-entry-id');
        title = article.children[0].children[0].children[0].innerHTML.trim();
    } else {
        gag_id = mo[1];
        title = article.children[0].children[0].innerHTML;
    }
}

chrome.runtime.sendMessage({gag_id: gag_id, title: title});
