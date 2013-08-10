function updateGagId() {
    var url = window.location.toString();
    if(url.match(/https?:\/\/9gag\.com/) == null)
        return;

    var mo = url.match(/https?:\/\/9gag\.com\/gag\/(\w+)/);
    var article = document.getElementsByClassName('badge-in-view-focus')[0];
    if(mo != null)
        curGagId = mo[1];
    else
        curGagId = article.getAttribute('data-entry-id');
    console.log(curGagId);
}
