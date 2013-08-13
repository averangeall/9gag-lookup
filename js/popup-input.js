function getQueryVal() {
    var query = $('#lookup-query').val();
    query = $.trim(query.toLowerCase());
    var chars = query.match(/[\w.'" ]/g);
    query = (chars == null) ? '' : chars.join('');
    return query;
}

function focusQuery() {
    $('#lookup-query').focus();
}

function putQueryInput() {
    var query = $('<input/>').attr('id', 'lookup-query')
                             .attr('type', 'text')
                             .attr('placeholder', '請在這裡輸入')
                             .keyup(function(evt) {
                                 if(evt.which == 13)
                                     $('#lookup-recomms-contain .btnn-inverse').click();
                                 else
                                     filterRecomm(false);
                             });
    $('#lookup-query-contain').append(query);
}

