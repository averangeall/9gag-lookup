function removeAllRecomms() {
    $('#recomm-words p').empty();
}

function putSingleRecomm(recomm) {
    var button = $('<a/>').html(recomm.content)
                          .attr('href', '#')
                          .attr('class', 'btn btn-large btn-primary')
                          .attr('data-id', recomm.id)
                          .click(function() {
                              putAllExpls(this);
                          });
    $('#recomm-words p').append(button)
                        .append(' ');
}

function filterRecomm() {
    removeAllRecomms();
    for(var i in allRecomms) {
        var lowerRecomm = allRecomms[i].content.toLowerCase();
        var lowerInput = inputRecomm.toLowerCase();
        if(lowerInput == '' || lowerRecomm.indexOf(lowerInput) != -1)
            putSingleRecomm(allRecomms[i]);
    }
}

function putAllRecomms() {
    putLoading();
    reliableGet(makeExtraUrl('recomm', 'get'), function(recommWords) {
        removeLoading();
        if(recommWords.status == 'OKAY')
            allRecomms = recommWords.respond;
        filterRecomm();
        //userRecomm();
    });
}

