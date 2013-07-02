function removeAllRecomm() {
    $('#recomm-words p').empty();
}

function putSingleRecomm(word) {
    var button = $('<a/>').html(word)
                          .attr('href', '#')
                          .attr('class', 'btn btn-large btn-primary')
                          .click(function() {
                              putAllDefi(word);
                          });
    $('#recomm-words p').append(button)
                        .append(' ');
}

function filterRecomm() {
    removeAllRecomm();
    for(var i in allRecomms) {
        var lowerRecomm = allRecomms[i].toLowerCase();
        var lowerInput = inputRecomm.toLowerCase();
        if(input == '' || lowerRecomm.indexOf(lowerInput) != -1)
            putSingleRecomm(allRecomms[i]);
    }
}

function putAllRecomm() {
    putLoading();
    reliableGet(makeExtraUrl('recomm', 'get'), function(recommWords) {
        removeLoading();
        if(recommWords.status == 'OKAY')
            allRecomms = recommWords.respond;
        filterRecomm();
        userRecomm();
    });
}

