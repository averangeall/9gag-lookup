function removeAllRecomms() {
    $('#lookup-recomms').empty();
}

function putSingleRecomm(recomm) {
    var button = $('<a/>').html(recomm.content)
                          .attr('href', 'javascript: void(0);')
                          .addClass('btnn btnn-large btnn-primary')
                          .attr('data-id', recomm.id)
                          .click(function() {
                              //allExplains.length = 0;
                              //wordId = recomm.id;
                              //putAllExpls(recomm);
                          });
    $('#lookup-recomms').append(button)
                        .append(' ');
}

function filterRecomm() {
    removeAllRecomms();
    $.each(allGagInfo[curGagId].recomms, function(i, recomm) {
        putSingleRecomm(recomm);
    });
    //for(var i in allRecomms) {
    //    var lowerRecomm = allRecomms[i].content.toLowerCase();
    //    var lowerInput = inputRecomm.toLowerCase();
    //    if(lowerInput == '' || lowerRecomm.indexOf(lowerInput) != -1)
    //        putSingleRecomm(allRecomms[i]);
    //}
}

function putAllRecomms() {
    //putLoading();
    reliableGet(makeExtraUrl('recomm', 'get', {}), function(res) {
        //removeLoading();
        allGagInfo[curGagId] = {}
        if(res.status == 'OKAY')
            allGagInfo[curGagId].recomms = res.respond;
        filterRecomm();
        //userRecomm();
    });
}

