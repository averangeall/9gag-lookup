function getGagId() {
    var url = window.location.toString();
    if(url.match(/https?:\/\/9gag\.com/) == null)
        return;

    var mo = url.match(/https?:\/\/9gag\.com\/gag\/(\w+)/);
    var article = document.getElementsByClassName('badge-in-view-focus')[0];
    var gagId;
    if(mo != null)
        gagId = mo[1];
    else
        gagId = article.getAttribute('data-entry-id');
    return gagId;
}
