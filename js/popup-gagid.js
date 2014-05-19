function getGagId() {
    var url = window.location.toString();
    if(url.match(/https?:\/\/9gag\.com/) == null)
        return;

    var mo = url.match(/https?:\/\/9gag\.com\/gag\/(\w+)/);
    var focuses = document.getElementsByClassName('badge-in-view-focus');
    var focus = focuses[0];
    var articles = document.getElementsByTagName('article');
    var article = articles[0];

    var gagId;
    if(mo != null) {
        gagId = mo[1];
    } else if(focus != null) {
        gagId = focus.getAttribute('data-entry-id');
    } else if(article != null) {
        gagId = article.getAttribute('data-entry-id');
    } else {
        gagId = null;
    }

    return gagId;
}
