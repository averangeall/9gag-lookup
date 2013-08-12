function getInputQuery() {
    var query = $('#lookup-input').val();
    query = $.trim(query.toLowerCase());
    var chars = query.match(/[\w.'" ]/g);
    query = (chars == null) ? '' : chars.join('');
    return query;
}

function focusInput() {
    $('#lookup-input').focus();
}

function setInputListener() {
    if($('#lookup-input').length == 0)
        return;
    $('#lookup-input').keyup(function(evt) {
        if(evt.which == 13)
            $('#lookup-recomms .btnn-inverse').click();
        else
            filterRecomm(false);
    });
}

