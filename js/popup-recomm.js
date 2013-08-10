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
    if(allGagInfo[curGagId].recomms == 0) {
        $('.lookup-has-recomms').removeClass('lookup-has-recomms').addClass('lookup-no-recomms');
        $('.lookup-more-input').removeClass('lookup-more-input').addClass('lookup-please-input');
    } else {
        $('.lookup-no-recomms').removeClass('lookup-no-recomms').addClass('lookup-has-recomms');
        $('.lookup-please-input').removeClass('lookup-please-input').addClass('lookup-more-input');
    }
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
    if($('#lookup-recomms').length == 0)
        return;
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

