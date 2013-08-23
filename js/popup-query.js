function getQueryVal() {
    var query = $('#lookup-query').val();
    query = $.trim(query.toLowerCase());
    var chars = query.match(/[\w.'"\- ]/g);
    query = (chars == null) ? '' : chars.join('');
    return query;
}

function focusQuery() {
    $('#lookup-query').focus();
}

function putQueryInput() {
    var query = $('<input/>').attr('id', 'lookup-query')
                             .attr('type', 'text')
                             .attr('placeholder', '請在這裡輸入');
    query.focus(function() {
        $('#lookup-recomms-row').slideDown();
    });

    query.keyup(function(evt) {
        if(evt.which != 13)
            filterRecomm(false);
        else {
            $('#lookup-recomms-contain .btnn-inverse').click();
            query.blur();
        }
    });

    $('#lookup-query-contain').append(query);
}

