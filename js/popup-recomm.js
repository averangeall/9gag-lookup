function removeAllRecomms() {
    $('#lookup-recomms-contain').empty();
}

function putSingleRecomm(recomm, color, fade) {
    var button = $('<a/>').html(recomm.content)
                          .attr('href', 'javascript: void(0);')
                          .addClass('btnn btnn-large')
                          .addClass(color)
                          .attr('data-id', recomm.id)
                          .click(function() {
                              $('#lookup-recomms-contain .btnn-inverse').removeClass('btnn-inverse')
                                                                        .addClass('btnn-primary');
                              $(this).removeClass('btnn-primary')
                                     .addClass('btnn-inverse');
                              curWordId = recomm.id;
                              prepareExplContent();
                              loadExpls(curGagId, recomm);
                          });
    $('#lookup-recomms-contain').append(button)
                                .append(' ');
}

function filterRecomm(first) {
    removeAllRecomms();
    if(allGagInfo[curGagId].recomms == 0) {
        $('.lookup-has-recomms').removeClass('lookup-has-recomms').addClass('lookup-no-recomms');
        $('.lookup-more-input').removeClass('lookup-more-input').addClass('lookup-please-input');
    } else {
        $('.lookup-no-recomms').removeClass('lookup-no-recomms').addClass('lookup-has-recomms');
        $('.lookup-please-input').removeClass('lookup-please-input').addClass('lookup-more-input');
    }

    var query = getQueryVal();
    var chosen = false;
    var color;
    $.each(allGagInfo[curGagId].recomms, function(i, recomm) {
        color = 'btnn-primary';
        if(!chosen && query != '' && recomm.content.match('^' + query)) {
            color = 'btnn-inverse';
            chosen = true;
        }
        putSingleRecomm(recomm, color, first);
    });

    if(query != '') {
        color = chosen ? 'btnn-primary' : 'btnn-inverse';
        putSingleRecomm({content: query}, color, first);
    }
}

function putAllRecomms() {
    if($('#lookup-recomms-contain').length == 0)
        return;
    reliableGet(makeExtraUrl('recomm', 'get', {}), function(res) {
        if(!(curGagId in allGagInfo))
            allGagInfo[curGagId] = {};
        if(res.status == 'OKAY')
            allGagInfo[curGagId].recomms = res.respond.recomms;
        filterRecomm(true);
    });
}

