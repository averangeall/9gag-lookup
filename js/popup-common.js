function putTitle(title) {
    $('#title').html(title);
}

function putHLine(to) {
    var line = $('<span/>');
    for(var i = 0; i < 110; ++ i) {
        var slice = $('<img/>').attr('src', 'images/hline-slice.png');
        line.append(slice);
    }
    line.append($('<br/>'));
    to.append(line);
}

function putLoading() {
    var loadingImg = $('<img/>').attr('src', 'images/loading.gif');
    $('#loading').empty().append(loadingImg);
}

function removeLoading() {
    $('#loading').empty();
}
