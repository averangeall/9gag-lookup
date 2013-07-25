function putTitle(title) {
    $('#title').html(title);
}

function putHLine(to) {
    var line = $('<div/>').addClass('hline');
    to.append(line);
}

function putLoading() {
    var loadingImg = $('<img/>').attr('src', 'images/loading.gif');
    $('#loading').empty().append(loadingImg);
}

function removeLoading() {
    $('#loading').empty();
}
