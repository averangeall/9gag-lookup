function removeAllRecomms() {
    $('#lookup-recomms').empty();
}

function putSingleRecomm(recomm, color) {
    var button = $('<a/>').html(recomm.content)
                          .attr('href', 'javascript: void(0);')
                          .addClass('btnn btnn-large')
                          .addClass(color)
                          .attr('data-id', recomm.id)
                          .click(function() {
                              curWordId = recomm.id;
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

    var query = getInputQuery();
    var chosen = false;
    var color;
    $.each(allGagInfo[curGagId].recomms, function(i, recomm) {
        color = 'btnn-primary';
        if(!chosen && query != '' && recomm.content.match('^' + query)) {
            color = 'btnn-inverse';
            chosen = true;
        }
        putSingleRecomm(recomm, color);
    });

    if(query != '') {
        color = chosen ? 'btnn-primary' : 'btnn-inverse';
        putSingleRecomm({content: query}, color);
    }
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

