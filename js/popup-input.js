function putUserRecomm(query) {
    if(query != '')
        putSingleRecomm({content: query});
}

function getInputQuery() {
    var query = $('#lookup-input').val();
    query = $.trim(query.toLowerCase());
    return query;
}

function setInputListener() {
    if($('#lookup-input').length == 0)
        return;
    $('#lookup-input').keyup(function(evt) {
        if(evt.which == 13) {
            $('#lookup-recomms .btnn-inverse').click();
        } else {
            filterRecomm();
            //putUserRecomm();
            //setRecommBtnClass();
        }
    });
}

