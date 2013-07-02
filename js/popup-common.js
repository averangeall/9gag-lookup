function putHLine(to) {
    var line = $('<p/>');
    for(var i = 0; i < 80; ++ i) {
        var slice = $('<img/>').attr('src', 'images/hline-slice.png');
        line.append(slice);
    }
    to.append(line);
}

function putLoading() {
    var loadingImg = $('<img/>').attr('src', 'images/loading.gif');
    $('#loading').empty().append(loadingImg);
}

function removeLoading() {
    $('#loading').empty();
}
