function getGagId() {
    var url = window.location.toString();
    if(url.match(/https?:\/\/9gag\.com/) == null)
        return;

    var mo = url.match(/https?:\/\/9gag\.com\/gag\/(\w+)/);
    var focuses = document.getElementsByClassName('badge-in-view-focus');

    var gagId;
    if(mo != null) {
        gagId = mo[1];
    } else if(focuses != null) {
        var focus = focuses[0];
        gagId = focus.getAttribute('data-entry-id');
    } else {
        gagId = null;
    }
    console.log('gagId:' + gagId);

    return gagId;
}
