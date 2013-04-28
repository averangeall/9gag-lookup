var baseUrl = 'http://daisy.csie.org:2266';

function is9gag(url) {
    return (url.match(/https?:\/\/9gag\.com/) != null);
}

function getGagId(url) {
    var mo = url.match(/https?:\/\/9gag\.com\/gag\/(\w+)/);
    if(mo == null || mo.length != 2)
        return null;
    return mo[1];
}

